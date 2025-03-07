/* eslint-disable react/function-component-definition */
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';
import images from '../../../base/styles/icons';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import UnderlineInput from '../../../components/UnderlineInput';
import { platformType } from '../../../utils/platformType';
import {
  SignUpDocumentTypeEnum,
  useSignUpMutation, useSignUpVerificationCodeMutation,
} from '../../../base/graphql/generated';
import isValidCPF from '../../../utils/CPFValidator';
import useAuthModalStore from '../../../zustand/useAuthModalStore';
import { removeNonNumbers } from '../../../utils/removeNonNumbers';
import { cpfMask } from '../../../utils/cpfMask';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import EventProvider from '../../../utils/EventProvider';
import ModalCheckUserConnection from '../component/ModalCheckUserConnection';
import CodeInput from '../../../components/CodeInput/CodeInput';
import { getCopiedValue } from '../../../utils/CopyToClipboard';
import { useCheckConnection } from '../../../hooks/useCheckConnection';
import { Box } from '../../../components/Box/Box';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { Method } from '../../../utils/EventProvider/Event';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';

export interface PasswordCheckProps {
  text: string;
  checked: boolean;
}

export const PasswordCheck: React.FC<PasswordCheckProps> = ({
  text,
  checked,
}) => {
  const color = checked ? 'verdeSucesso' : 'neutroFrio2';
  return (
    <Box flexDirection="row" alignItems="center" width="50%" mt={15}>
      <Box mt="nano" mr={2}>
        <IconLegacy name="Check" size={16} color={color} />
      </Box>
      <Typography color={color}>{text}</Typography>
    </Box>
  );
};

export interface ConfirmAccessCodeProps
  extends StackScreenProps<RootStackParamList, 'ConfirmAccessCode'> { }

export const ConfirmAccessCode: React.FC<ConfirmAccessCodeProps> = ({
  navigation,
  route,
}) => {
  const {
    setModalSignUpComplete,
    showModalCheckConnection,
  } = useAuthModalStore(['setModalSignUpComplete', 'showModalCheckConnection']);
  const {
    orderFormId,
  } = useBagStore(['orderFormId']);
  const [isLoading, setIsLoading] = useState(false);
  const { email, cookies, comeFrom } = route.params;
  const { getBoolean } = useRemoteConfig();
  const [showError, setShowError] = useState(false);
  const [code, setCode] = useState('');
  const [cpf, setCpf] = useState('');
  const [requestCookie, setRequestCookie] = useState(cookies);
  const [passwords, setPasswords] = useState({
    first: '',
    confirm: '',
  });
  const { onSignIn, onUpdateAuthData } = useAuthStore(['onSignIn', 'onUpdateAuthData']);
  const [CPFMessageError, setCPFMessageError] = useState('');
  const [signUpVerificationCode] = useSignUpVerificationCodeMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });
  const passwordError = '';
  const { ModalWithoutInternet } = useCheckConnection({});

  const pasteCode = useCallback(async () => {
    const payload = await getCopiedValue();
    setCode(payload);
  }, []);

  const passwordCheckHandler = () => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) != null,
  });

  const [passwordsChecker, setPasswordChecker] = useState(
    passwordCheckHandler(),
  );

  const enabledButton = () => passwordsChecker.equal
    && passwordsChecker.digitsCount
    && passwordsChecker.uppercase
    && passwordsChecker.lowercase
    && passwordsChecker.number
    && isValidCPF(cpf)
    && code.length === 6;

  const [signUp, { data, error }] = useSignUpMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const goToWebviewCheckout = useCallback(() => navigation.navigate('Checkout', {
    url: `${Config.URL_VTEX_QA}/checkout?orderFormId=${orderFormId}/&test=2&document=${removeNonNumbers(cpf)}&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/shipping`,
  }), [orderFormId]);

  const handleSignUp = useCallback(async () => {
    EventProvider.logEvent('signup_create_password_click', {});

    const variables = {
      input: {
        email,
        code,
        password: passwords.confirm,
        document: removeNonNumbers(cpf),
        documentType: SignUpDocumentTypeEnum.Cpf,
        cookies: requestCookie,
      },
    };

    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await signUp({ variables });

      EventProvider.logEvent('sign_up', {
        method: Method.Email,
      });

      if (response?.data?.signUp?.token && response?.data?.signUp?.authCookie) {
        try {
          await onSignIn(email, passwords.confirm, true);
        } catch (err) {
          ExceptionProvider.captureException(err, 'handleSignUp - ConfirmAccessCode', { document: cpf, email });
        }

        await onUpdateAuthData(response?.data?.signUp?.token, response?.data?.signUp?.authCookie);
        setModalSignUpComplete(true);
        if (comeFrom === 'BagScreen' && getBoolean('should_redirect_to_checkout')) {
          goToWebviewCheckout();
          return;
        }
        navigation.navigate('Home');
      }
    } catch (e) {
      setPasswords({
        confirm: '',
        first: '',
      });
      setCode('');
      ExceptionProvider.captureException(e, 'handleSignUp - ConfirmAccessCode', { document: cpf, email });
    } finally {
      setIsLoading(false);
    }
  }, [
    code,
    cpf,
    email, isLoading,
    navigation,
    onSignIn,
    onUpdateAuthData,
    passwords.confirm,
    requestCookie,
    setModalSignUpComplete,
    signUp,
    comeFrom,
  ]);

  useEffect(() => {
    setPasswordChecker(passwordCheckHandler());
  }, [passwords]);

  const resendCode = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await signUpVerificationCode({
        variables: {
          input: {
            email,
          },
        },
      });

      if (response?.data?.signUpVerificationCode?.cookies) {
        setRequestCookie(response?.data?.signUpVerificationCode?.cookies);
      }
    } catch (err) {
      setIsLoading(false);
      ExceptionProvider.captureException(err, 'resendCode - ConfirmAccessCode.tsx', { email });
    } finally {
      setIsLoading(false);
    }
  }, [email, signUpVerificationCode]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [data, error]);

  const verifyCPF = useCallback((value: string) => {
    const newValue = removeNonNumbers(value);

    if (!isValidCPF(newValue)) {
      setCPFMessageError('CPF inválido. Tente novamente.');
      return;
    }

    setCPFMessageError('');
  }, []);

  const applyCpfMask = useCallback((value: string) => {
    if (value.length <= 14) {
      const payload = cpfMask(value);
      setCpf(payload);
    }
  }, []);

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>

      <ModalWithoutInternet />

      <ScrollView ref={scrollViewRef}>
        <>
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll={Platform.OS === platformType.IOS}
            extraScrollHeight={155}
          >

            <HeaderBanner
              imageHeader={images.headerLogin}
              onClickGoBack={() => {
                navigation.goBack();
              }}
            />
            <Box mx={20} mt={13}>
              <Typography fontFamily="reservaSerifRegular" fontSize={22}>
                Confirme seu código
              </Typography>
              <Box mt={10}>
                <Typography fontFamily="nunitoRegular" fontSize={15}>
                  Digite o código enviado para o e-mail:
                </Typography>
                {email && (
                  <Typography
                    fontFamily="nunitoRegular"
                    fontSize={15}
                    color="neutroFrio2"
                  >
                    {email}
                  </Typography>
                )}
              </Box>
              <Box mt={11}>
                <CodeInput
                  code={code}
                  onChageCode={setCode}
                  showError={showError}
                />
              </Box>
            </Box>

            {code?.length > 0 ? (
              <Box mx={20} mt={32}>
                <Box mb={20}>
                  <Typography fontFamily="reservaSerifRegular" fontSize={22}>
                    Dados pessoais
                  </Typography>
                </Box>

                <Box
                  flexDirection="row"
                  borderBottomWidth="hairline"
                  borderBottomColor={CPFMessageError !== '' ? 'vermelhoAlerta' : 'neutroFrio2'}
                  justifyContent="space-between"
                  style={{ overflow: 'hidden' }}
                >
                  <TextInput
                    placeholder="Digite seu CPF"
                    onChangeText={(value) => applyCpfMask(value)}
                    autoComplete="off"
                    autoCapitalize="none"
                    onEndEditing={(e) => verifyCPF(e.nativeEvent.text)}
                    keyboardType="number-pad"
                    value={cpf}
                    style={{
                      padding: 0,
                      margin: 0,
                      flex: 1,
                    }}
                  />

                </Box>

                <Box mt={10}>
                  <Text
                    style={{ color: '#EF1E1E' }}
                  >
                    {CPFMessageError}

                  </Text>
                </Box>

                <Box mb={20} mt={20}>
                  <Typography fontFamily="reservaSerifRegular" fontSize={22}>
                    Agora, crie sua senha
                  </Typography>
                </Box>

                <Box
                  borderBottomWidth="hairline"
                  borderBottomColor={passwordError !== '' ? 'vermelhoAlerta' : 'neutroFrio2'}
                >
                  <UnderlineInput
                    isSecureText
                    testID="confirmaccess_input_password"
                    onFocus={() => scrollViewRef.current?.scrollToEnd()}
                    onChangeText={(text) => setPasswords({ ...passwords, first: text })}
                    placeholder="Digite sua nova senha"
                  />
                </Box>
                <Box
                  mt="sm"
                  borderBottomWidth="hairline"
                  borderBottomColor={passwordError !== '' ? 'vermelhoAlerta' : 'neutroFrio2'}
                >
                  <UnderlineInput
                    testID="confirmaccess_input_confirm_password"
                    isSecureText
                    onFocus={() => scrollViewRef.current?.scrollToEnd()}
                    onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
                    placeholder="Confirme sua nova senha"
                  />
                </Box>

                <Box mt={10}>
                  <Text
                    style={{ color: '#EF1E1E' }}
                  >
                    {passwordError}

                  </Text>
                </Box>

                <Box mt={22}>
                  <Typography>Sua senha deve ter pelo menos:</Typography>
                </Box>
                <Box mx={44} flexDirection="row" flexWrap="wrap" pt={2}>
                  <PasswordCheck
                    checked={passwordsChecker.digitsCount}
                    text="8 dígitos"
                  />
                  <PasswordCheck
                    checked={passwordsChecker.lowercase}
                    text="1 letra maiúscula"
                  />
                  <PasswordCheck
                    checked={passwordsChecker.number}
                    text="1 número"
                  />
                  <PasswordCheck
                    checked={passwordsChecker.uppercase}
                    text="1 letra minúscula"
                  />
                </Box>
                <Box mb={20}>
                  <TouchableOpacity
                    onPress={handleSignUp}
                    disabled={!enabledButton()}
                    style={{
                      opacity: !enabledButton() ? 0.35 : 1,
                      backgroundColor: '#333333',
                      padding: 20,
                      marginVertical: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Typography fontFamily="nunitoBold" fontSize={16} color="white">
                        CRIAR SENHA
                      </Typography>
                    )}
                  </TouchableOpacity>
                </Box>
              </Box>
            ) : (
              <>
                <Box alignItems="center" mt="nano" mb="quarck">
                  <TouchableOpacity onPress={pasteCode}>
                    <Typography
                      fontFamily="nunitoRegular"
                      fontSize={13}
                      style={{ textDecorationLine: 'underline' }}
                    >
                      Colar código
                    </Typography>
                  </TouchableOpacity>
                </Box>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#333',
                    padding: 15,
                    marginHorizontal: 20,
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={resendCode}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Typography fontFamily="nunitoBold" fontSize={14} color="white">
                      REENVIAR CÓDIGO
                    </Typography>
                  )}
                </TouchableOpacity>
              </>
            )}
          </KeyboardAwareScrollView>

          {showModalCheckConnection && <ModalCheckUserConnection />}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};
