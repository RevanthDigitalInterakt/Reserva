import { useMutation } from '@apollo/client';
import { Box, Button, Typography } from '@danilomsou/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, ScrollView } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import { sha256 } from 'react-native-sha256';
import * as Yup from 'yup';
// @ts-ignore
import PushIOManager from '@oracle/react-native-pushiomanager';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import {
  classicSignInMutation,
  sendEmailVerificationMutation,
} from '../../../graphql/login/loginMutations';
import { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import UnderlineInput from '../components/UnderlineInput';
import Sentry from '../../../config/sentryConfig';

enum CryptType {
  SHA256 = 3,
}

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export const LoginScreen: React.FC<Props> = ({
  children,
  route,
  navigation,
}) => {
  const { comeFrom } = route.params;
  const { setCookie, setEmail, saveCredentials } = useAuth();

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
  const [loginWithCode] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const [login, { data, loading }] = useMutation(classicSignInMutation);
  const [sendEmail, { loading: loadingSendMail }] = useMutation(sendEmailVerificationMutation);

  const { identifyCustomer } = useCart();

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

  const removeMessageErrorEmail = () => {
    setLoginCredentials({
      ...loginCredentials,
      showUsernameError: false,
      usernameError: '',
    });
  };
  const handleLogin = async () => {
    if (emailIsValid && passwordIsValid) {
      const email = loginCredentials.username.trim().toLowerCase();

      const { data, errors } = await login({
        variables: {
          email,
          password: loginCredentials.password,
        },
      });

      if (data.classicSignIn === 'Success') {
        const emailHash = await sha256(email);

        saveCredentials({
          email,
          password: loginCredentials.password,
        });

        OneSignal.setExternalUserId(email);

        PushIOManager.registerUserId(email);

        appsFlyer.logEvent(
          'af_login',
          {},
          (res) => { },
          (error) => {
            Sentry.captureException(error);
          }
        );

        appsFlyer.setUserEmails(
          {
            emails: [emailHash],
            emailsCryptType: CryptType.SHA256,
          },
          (success) => { },
          (error) => {
            Sentry.captureException(error);
          }
        );

        if (setEmail) setEmail(email);

        AsyncStorage.setItem(
          '@RNAuth:email',
          loginCredentials.username.trim().toLowerCase()
        ).then(() => {});
        await AsyncStorage.setItem('@RNAuth:lastLogin', `${moment.now()}`);
        await AsyncStorage.setItem('@RNAuth:typeLogin', 'classic');
      } else {
        validateCredentials();
      }
    } else {
      validateCredentials();
    }
  };

  const handleLoginCode = () => {
    if (emailIsValid) {
      removeMessageErrorEmail();
      sendEmail({
        variables: {
          email: loginCredentials.username,
        },
      }).then((data) => {
        saveCredentials(null);
        navigation.navigate('AccessCode', {
          email: loginCredentials.username,
        });
      });
    } else {
      setLoginCredentials({
        ...loginCredentials,
        showUsernameError: true,
        usernameError: 'Digite um e-mail válido',
      });
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
        .then(() =>
          navigation.navigate('DeliveryScreen', { comeFrom: 'Login' })
        );
    }
  }

  const ClientDelivery = async () => {
    if (!loading && data?.cookie) {
      setCookie(data?.cookie);
      AsyncStorage.setItem('@RNAuth:cookie', data?.cookie).then(() => {
        if (comeFrom === 'Checkout') {
          verifyUserEmail();
          return;
        }

        navigation.navigate('Home');
      });
    }
  };

  useEffect(() => {
    ClientDelivery();
  }, [data]);

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('LoginScreen'));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={() => {
          navigation.navigate('Home');
        }}
        loading={isLoadingEmail}
      />
      <ScrollView testID="login_scrollview">
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
              accessibilityLabel="login_input_email"
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
                    Yup.string().required().email().isValidSync(text.trim())
                  );
                } catch (error) {
                  Sentry.captureException(error, {
                    extra: {
                      writtenEmail: text,
                    },
                  });
                }
              }}
            />

            {!loginWithCode && (
              <Box mt="md" width="100%">
                <UnderlineInput
                  accessibilityLabel="login_input_password"
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
                        .isValidSync(text)
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
            )}
          </Box>
          <Box mt="md" />
          <Button
            testID="login_button_entrar"
            title={!loginWithCode ? 'ENTRAR' : 'RECEBER CÓDIGO'}
            inline
            variant="primarioEstreitoOutline"
            disabled={loadingSendMail || loading || isLoadingEmail}
            onPress={() => (loginWithCode ? handleLoginCode() : handleLogin())}
          />
          {/* }
          <Box my={50}>
            <Typography variant="tituloSessao" textAlign="center">
              OU
            </Typography>
          </Box>
          <Button
            title={
              loginWithCode
                ? 'ENTRAR COM LOGIN E SENHA'
                : 'RECEBER CÓDIGO DE ACESSO'
            }
            inline
            variant="primarioEstreitoOutline"
            onPress={() => {
              setLoginWithCode(!loginWithCode);

              // remove a mensagem de erro do campo email
              removeMessageErrorEmail();
            }}
          />
          */}

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
              {'Ainda não possui uma conta?'}
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
            testID="login_button_cadastrese"
            title={'CADASTRE-SE'}
            inline
            variant="primarioEstreito"
            disabled={loadingSendMail || loading || isLoadingEmail}
            onPress={() => {
              navigation.navigate('RegisterEmail', {});
            }}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
