/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { useTimerStore } from '../../zustand/useTimerStore';
import { scale } from '../../utils/scale';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';
import { FONTS } from '../../base/styles';
import { useAuthentication } from '../../hooks/useAuthentication';

type Props = StackScreenProps<RootStackParamList, 'NewForgotAccessCode'>;

export default function NewForgotAccessCode({ navigation, route }: Props) {
  const username = route?.params?.username;
  const cookies = route?.params?.cookies || [];

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);
  const [loadingResendCode, setLoadingResendCode] = useState(false);

  const { handleResendCode, loadingSignIn } = useAuthentication({ closeModal: undefined });

  const {
    getRemainingTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerStore();

  const timer = useTimerStore((state) => state.timers[username]);
  const isActive = timer?.isActive ?? false;

  const [displayTime, setDisplayTime] = useState(getRemainingTime(username));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        const remaining = getRemainingTime(username);
        setDisplayTime(remaining);

        if (remaining <= 0) {
          pauseTimer(username);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, username, getRemainingTime, pauseTimer]);

  const formatTime = useCallback((seconds: number) => {
    if (seconds === 0) {
      return '';
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const navigateToNewPassword = useCallback(() => {
    const finalCode = code.join('');

    if (finalCode.length < 6) {
      setIsError(true);
      return;
    }

    navigation.navigate('NewForgotNewPassword', {
      email: username,
      code: finalCode,
      cookies,
    });
  }, [code, cookies, username]);

  useEffect(() => {
    const remaining = getRemainingTime(username);
    if (remaining === 0) {
      resetTimer(username);
      startTimer(username, cookies);
    }
  }, [username, getRemainingTime, resetTimer, startTimer]);

  const doResendCode = useCallback(async (params: string) => {
    try {
      setLoadingResendCode(true);
      resetTimer(params);
      setIsError(false);
      setCode(['', '', '', '', '', '']);
      await handleResendCode(params);
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o código, tente mais tarde.');
      setIsError(true);
    } finally {
      setLoadingResendCode(false);
    }
  }, [resetTimer, startTimer]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          hitSlop={{
            top: 24, left: 24, bottom: 24, right: 24,
          }}
          onPress={navigation.goBack}
        >
          <IconChevronLeftSmall color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirme seu código</Text>
        <Text style={styles.subtitle}>Insira o código recebido por e-mail abaixo:</Text>

        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={`${index}-input`}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[styles.input, isError ? { color: '#DD3636' } : {}]}
              placeholder={(value === '' && focusedIndex !== index) ? '•' : ''}
              placeholderTextColor={isError ? '#DD3636' : '#999'}
              keyboardType="number-pad"
              maxLength={1}
              onFocus={() => {
                if (isError) setIsError(false);
                setFocusedIndex(index);
                if (value !== '') {
                  handleChange('', index);
                }
              }}
              onBlur={() => setFocusedIndex(null)}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
        {isError ? (
          <Text style={{
            color: '#DD3636',
            marginTop: 3,
            marginLeft: 4,
            fontFamily: FONTS.INTER_MEDIUM,
          }}
          >
            Código inválido ou expirado.
          </Text>
        ) : <View style={{ marginTop: 24 }} />}

        <View style={styles.bottomContainer}>
          {displayTime > 0 ? (
            <>
              <Text style={styles.resendText}>
                Não recebeu seu código?
              </Text>
              {loadingResendCode
                ? <ActivityIndicator style={{ marginTop: 4 }} size="small" color="#999" />
                : (
                  <Text style={styles.resendText}>
                    Peça um novo em
                    {' '}
                    <Text style={styles.timerText}>
                      {formatTime(displayTime)}
                    </Text>
                  </Text>
                )}
            </>
          ) : (
            <TouchableOpacity onPress={() => doResendCode(username)}>
              <Text style={styles.resendText}>
                Não recebeu seu código?
              </Text>
              {loadingResendCode
                ? <ActivityIndicator style={{ marginTop: 4 }} size="small" color="#999" />
                : (
                  <Text style={[styles.resendText, styles.resendLink]}>
                    Peça um novo
                  </Text>
                )}
            </TouchableOpacity>
          )}
        </View>

      </View>

      <TouchableOpacity
        style={styles.button}
        disabled={loadingSignIn}
        onPress={navigateToNewPassword}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 24,
  },
  title: {
    marginTop: 24,
    fontSize: scale(24),
    color: '#000000',
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  subtitle: {
    marginBottom: 16,
    fontSize: scale(13),
    marginTop: 8,
    color: '#7B7B7B',
    fontFamily: FONTS.INTER_MEDIUM,
    lineHeight: 19.6,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  input: {
    width: 40,
    height: 70,
    textAlign: 'center',
    fontSize: scale(28),
  },
  bottomContainer: {
    marginTop: 24,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: scale(12),
    marginTop: 4,
    textAlign: 'center',
    color: '#6C727B',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FONTS.INTER_REGULAR,
  },
  timerText: {
    color: '#000',
    fontFamily: FONTS.INTER_BOLD,
  },
  resendLink: {
    fontSize: scale(12),
    color: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FONTS.INTER_SEMI_BOLD,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#282828',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: scale(13),
    fontFamily: FONTS.INTER_REGULAR,
  },
});
