/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconChevronLeft } from '../../components/IconLegacy/Svg';

export default function NewForgotAccessCode({ navigation }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (text, index) => {
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

  const handleConfirm = () => {
    const finalCode = code.join('');
    // setIsError(true);
    navigation.replace('NewForgotNewPassword');
  };

  const handleResendCode = () => {
    setIsError(false);
    setCode(['', '', '', '', '', '']);
    setSecondsLeft(10);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <IconChevronLeft color="#999" />
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
        {isError
          ? (
            <Text style={{
              color: '#DD3636',
              marginTop: 3,
              marginLeft: 4,
              fontFamily: 'Inter-Medium',
            }}
            >
              Código inválido ou expirado.
            </Text>
          )

          : <View style={{ marginTop: 24 }} />}

        <View style={styles.bottomContainer}>
          {secondsLeft > 0 ? (
            <>
              <Text style={styles.resendText}>
                Não recebeu seu código?
              </Text>

              <Text style={styles.resendText}>
                Peça um novo em
                {' '}
                <Text style={styles.timerText}>
                  0:
                  {String(secondsLeft).padStart(2, '0')}
                </Text>
              </Text>
            </>
          ) : (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={[styles.resendText]}>
                Não recebeu seu código?
              </Text>
              <Text style={[styles.resendText, styles.resendLink]}>
                Peça um novo
              </Text>
            </TouchableOpacity>
          )}
        </View>

      </SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  title: {
    marginTop: 32,
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
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
    fontSize: 28,
  },
  bottomContainer: {
    marginTop: 24,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6C727B',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter-Regular',

  },
  timerText: {
    fontFamily: 'Inter-Bold',
  },
  resendLink: {
    fontSize: 12,
    color: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Inter-Bold',
  },
  button: {
    backgroundColor: '#282828',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
