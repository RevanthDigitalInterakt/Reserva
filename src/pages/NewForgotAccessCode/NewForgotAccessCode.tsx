/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { useTimerStore } from '../../zustand/useTimerStore';
import { useRecoverPasswordResetMutation } from '../../base/graphql/generated';
import { scale } from '../../utils/scale';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';

type Props = StackScreenProps<RootStackParamList, 'NewForgotAccessCode'>;

export default function NewForgotAccessCode({ navigation, route }: Props) {
  const username = route?.params?.username;
  const cookies = route?.params?.cookies || [];

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  const [recoveryPasswordReset, { loading, error }] = useRecoverPasswordResetMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  console.log(error);

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
    if (code.length !== 6) {
      setIsError(true);
      return;
    }

    const finalCode = code.join('');
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

  const handleResendCode = useCallback(() => {
    resetTimer(username);
    startTimer(username, cookies);
    setIsError(false);
    setCode(['', '', '', '', '', '']);
  }, [username, resetTimer, startTimer]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
              placeholderTextColor="#999"
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
            fontFamily: 'Inter28pt-Medium',
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
              <Text style={styles.resendText}>
                Peça um novo em
                {' '}
                <Text style={styles.timerText}>
                  {formatTime(displayTime)}
                </Text>
              </Text>
            </>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendText}>
                Não recebeu seu código?
              </Text>
              <Text style={[styles.resendText, styles.resendLink]}>
                Peça um novo
              </Text>
            </TouchableOpacity>
          )}
        </View>

      </View>

      <TouchableOpacity disabled={loading} style={styles.button} onPress={navigateToNewPassword}>
        {loading
          ? <ActivityIndicator size="small" color="#FFF2F2" />
          : <Text style={styles.buttonText}>Continuar</Text>}

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
    marginHorizontal: 24,
  },
  title: {
    marginTop: 32,
    fontSize: scale(28),
    fontFamily: 'Inter28pt-Bold',
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: scale(13),
    fontFamily: 'Inter28pt-Regular',
    paddingBottom: 32,
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
    textAlign: 'center',
    color: '#6C727B',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter28pt-Regular',
  },
  timerText: {
    fontFamily: 'Inter28pt-Bold',
  },
  resendLink: {
    fontSize: scale(12),
    color: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter28pt-Bold',
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
    fontFamily: 'Inter28pt-Regular',
  },
});
