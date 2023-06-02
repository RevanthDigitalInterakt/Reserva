import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  BackHandler, Keyboard, SafeAreaView, ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { images } from '../../../assets';
import { useCart } from '../../../context/CartContext';

import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import UnderlineInput from '../components/UnderlineInput';
import EventProvider from '../../../utils/EventProvider';
import testProps from '../../../utils/testProps';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import useInitialDito from '../../../hooks/useInitialDito';

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export const LoginScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { comeFrom, previousPage } = route.params;
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
  const { onSignIn } = useAuthStore(['onSignIn']);

  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: '',
    showPasswordError: false,
    passwordError: '',
    showUsernameError: false,
    usernameError: '',
    hasError: false,
    showMessageError: '',
  });
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const { handleDitoRegister } = useInitialDito();

  const validateCredentials = () => {
    setLoginCredentials({
      ...loginCredentials,
      showPasswordError: true,
      showUsernameError: true,
      hasError: true,
      showMessageError:
        'Verifique os campos acima e digite um e-mail ou senha válidos',
    });
  };

  const doSignIn = useCallback(async (email: string, password: string) => {
    try {
      setLoadingSignIn(true);

      Keyboard.dismiss();

      await onSignIn(email, password);
      handleDitoRegister();

      navigation.navigate('Home');
    } catch (err) {
      EventProvider.captureException(err);
      validateCredentials();
    } finally {
      setLoadingSignIn(false);
    }
  }, [handleDitoRegister, navigation, onSignIn, validateCredentials]);

  const { identifyCustomer } = useCart();

  const handleLogin = async () => {
    if (emailIsValid && passwordIsValid) {
      setIsLoadingEmail(true);
      const email = loginCredentials.username.trim().toLowerCase();
      const { password } = loginCredentials;

      await doSignIn(email, password);

      setIsLoadingEmail(false);
    } else {
      validateCredentials();
    }
  };

  useEffect(() => {
    if (comeFrom === 'Profile') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }
  }, []);

  async function verifyUserEmail() {
    if (loginCredentials.username.trim().toLowerCase()) {
      setIsLoadingEmail(true);
      await identifyCustomer(loginCredentials.username.trim().toLowerCase())
        .then(() => setIsLoadingEmail(false))
        .then(() => navigation.navigate('DeliveryScreen', { comeFrom: 'Login' }));
    }
  }

  const ClientDelivery = useCallback(async () => {
    if (loadingSignIn) {
      return;
    }

    try {
      if (comeFrom === 'Checkout') {
        verifyUserEmail();
        return;
      }
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [comeFrom, loadingSignIn, verifyUserEmail]);

  const handleNavigatePreviusPage = useCallback(() => {
    if (previousPage) {
      navigation.navigate(previousPage);
      return;
    }

    navigation.navigate('Home');
  }, [previousPage, navigation]);

  useEffect(() => {
    ClientDelivery();
  }, []);

  useEffect(() => {
    EventProvider.sentry.configureScope((scope) => scope.setTransactionName('LoginScreen'));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={handleNavigatePreviusPage}
        loading={isLoadingEmail}
      />
      <ScrollView
        {...testProps('com.usereserva:id/login_scrollview')}
        keyboardShouldPersistTaps="always"
      >
        <Box px="xxs" pt="xxs" paddingBottom="xxl">
          <Typography fontFamily="reservaSerifRegular" fontSize={22}>
            Boas-vindas!
          </Typography>

          <Box mt="xxs">
            <Box marginBottom="xxxs">
              <Typography variant="tituloSessao">
                Insira seu e-mail para continuar:
              </Typography>
            </Box>

            <UnderlineInput
              testID="com.usereserva:id/login_input_email"
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              isSecureText={false}
              value={loginCredentials.username}
              showError={loginCredentials.showUsernameError}
              errorMsg={loginCredentials.usernameError}
              onChangeText={(text) => {
                try {
                  setLoginCredentials({ ...loginCredentials, username: text });
                  setEmailIsValid(
                    Yup.string().required().email().isValidSync(text.trim()),
                  );
                } catch (error) {
                  EventProvider.sentry.captureException(error, {
                    extra: {
                      writtenEmail: text,
                    },
                  });
                }
              }}
            />

            <Box mt="md" width="100%">
              <UnderlineInput
                testID="com.usereserva:id/login_input_password"
                isSecureText
                placeholder="Digite sua senha"
                value={loginCredentials.password}
                showError={loginCredentials.showPasswordError}
                onChangeText={(text) => {
                  setLoginCredentials({
                    ...loginCredentials,
                    password: text,
                  });
                  setPasswordIsValid(
                    Yup.string()
                      .required()
                      .matches(/^(?=.{8,})/) // 8 caracteres
                      .matches(/^(?=.*[A-Z])/) // pelo menos uma maiuscula
                      .matches(/^(?=.*[a-z])/) // pelo menos uma minuscula
                      .matches(/^(?=.*[0-9])/) // pelo menos um nuemro
                      .isValidSync(text),
                  );
                }}
              />
              <Box mt="micro" mb="quarck">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ForgotEmail', {});
                  }}
                >
                  <Typography style={{ textDecorationLine: 'underline' }}>
                    Esqueci minha senha
                  </Typography>
                </TouchableOpacity>
              </Box>
              {loginCredentials.hasError && (
              <Typography
                color="vermelhoAlerta"
                fontFamily="nunitoRegular"
                fontSize={13}
              >
                {loginCredentials.showMessageError}
              </Typography>
              )}
            </Box>
          </Box>

          <Box mt="md" />
          {/* TODO  add {...testProps(testID)} reserva-ui */}
          <Button
            accessible={false}
            testID="com.usereserva:id/login_button_sign_in"
            title="ENTRAR"
            inline
            variant="primarioEstreitoOutline"
            disabled={loadingSignIn || isLoadingEmail}
            onPress={handleLogin}
          />

          <Box
            flexDirection="row"
            mt="xxl"
            mb="xxs"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              borderWidth={1}
              marginLeft="xxs"
              marginRight="nano"
              flex={1}
              borderColor="divider"
            />
            <Typography textAlign="center">
              Ainda não possui uma conta?
            </Typography>
            <Box
              borderWidth={1}
              marginLeft="nano"
              marginRight="xxs"
              flex={1}
              borderColor="divider"
            />
          </Box>

          <Button
            testID="com.usereserva:id/login_button_sign_up"
            title="CADASTRE-SE"
            inline
            variant="primarioEstreito"
            disabled={loadingSignIn || isLoadingEmail}
            onPress={() => {
              navigation.navigate('RegisterEmail', {});
            }}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
