/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { COLORS } from '../../base/styles';
import { useTimerStore } from '../../zustand/useTimerStore';
import { IconChevronLeftSmall } from '../IconLegacy/Svg';
import { confirmationCodeStyles } from './confirmationCode.styles';

interface IConfirmationCodeProps {
  username: string;
  requestResendCode: (username: string) => Promise<void>
  cookies: string[]
  onChangeCode: (value: string) => void;
  isError: boolean;
  ContentBody: React.JSX.Element | null
}

export function ConfirmationCode({
  username, cookies, requestResendCode, onChangeCode, isError: externalIsError, ContentBody = null,
}: IConfirmationCodeProps) {
  const navigation = useNavigation();
  const inputRefs = useRef<TextInput[]>([]);
  const [isError, setIsError] = useState(externalIsError);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [loadingResendCode, setLoadingResendCode] = useState(false);

  const {
    getRemainingTime,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerStore();

  const [displayTime, setDisplayTime] = useState(getRemainingTime(username));
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const timer = useTimerStore((state) => state.timers[username]);
  const isActive = timer?.isActive ?? false;

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    setIsError(externalIsError);
  }, [externalIsError]);

  const handleKeyPress = ({ nativeEvent: { key } }:
  NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formatTime = useCallback((seconds: number) => {
    if (seconds === 0) {
      return '';
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const wrapperRequest = useCallback(async (params: string) => {
    try {
      setLoadingResendCode(true);
      resetTimer(params);
      setIsError(false);
      setCode(['', '', '', '', '', '']);
      await requestResendCode(params);
    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o código, tente mais tarde.');
      setIsError(true);
    } finally {
      setLoadingResendCode(false);
    }
  }, [resetTimer, startTimer]);

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

  useEffect(() => {
    const remaining = getRemainingTime(username);
    if (remaining === 0) {
      resetTimer(username);
      startTimer(username, cookies);
    }
  }, [username, getRemainingTime, resetTimer, startTimer]);

  useEffect(() => {
    const finalCode = code.join('');
    onChangeCode(finalCode);
  }, [code]);

  return (
    <View style={confirmationCodeStyles.container}>
      <TouchableOpacity
        hitSlop={{
          top: 24, left: 24, bottom: 24, right: 24,
        }}
        onPress={navigation.goBack}
      >
        <IconChevronLeftSmall color={COLORS.BLACK} />
      </TouchableOpacity>
      <Text style={confirmationCodeStyles.title}>Confirme seu código</Text>
      <Text style={confirmationCodeStyles.subtitle}>
        Insira o código recebido por e-mail abaixo:
      </Text>

      <View style={confirmationCodeStyles.codeContainer}>
        {code.map((value, index) => (
          <TextInput
            key={`${index}-input`}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={[confirmationCodeStyles.input, isError ? { color: COLORS.ERROR_INPUT } : {}]}
            placeholder={(value === '' && focusedIndex !== index) ? '•' : ''}
            placeholderTextColor={isError ? COLORS.ERROR_INPUT : COLORS.SHELF_GRAY}
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
        <Text style={confirmationCodeStyles.errorDescription}>
          Código inválido ou expirado.
        </Text>
      ) : <View style={{ marginTop: 24 }} />}

      {ContentBody}

      <View style={confirmationCodeStyles.bottomContainer}>
        {displayTime > 0 ? (
          <>
            <Text style={confirmationCodeStyles.resendText}>
              Não recebeu seu código?
            </Text>
            {loadingResendCode
              ? <ActivityIndicator style={{ marginTop: 4 }} size="small" color={COLORS.SHELF_GRAY} />
              : (
                <Text style={confirmationCodeStyles.resendText}>
                  Peça um novo em
                  {' '}
                  <Text style={confirmationCodeStyles.timerText}>
                    {formatTime(displayTime)}
                  </Text>
                </Text>
              )}
          </>
        ) : (
          <TouchableOpacity onPress={() => wrapperRequest(username)}>
            <Text style={confirmationCodeStyles.resendText}>
              Não recebeu seu código?
            </Text>
            {loadingResendCode
              ? <ActivityIndicator style={{ marginTop: 4 }} size="small" color={COLORS.SHELF_GRAY} />
              : (
                <Text
                  style={[confirmationCodeStyles.resendText, confirmationCodeStyles.resendLink]}
                >
                  Peça um novo
                </Text>
              )}
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}
