import { useLazyQuery, useMutation } from '@apollo/client';
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
import PushIOManager from '@oracle/react-native-pushiomanager';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import {
  classicSignInMutation,
  sendEmailVerificationMutation,
} from '../../../graphql/login/loginMutations';
import { profileQuery } from '../../../graphql/profile/profileQuery';
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
  const { cookie, setCookie, setEmail, saveCredentials } = useAuth();
  // const navigation = useNavigation();
  const [loginCredentials, setLoginCredentials] = React.useState({
    username: '',
    password: '',
    showPasswordError: false,
    passwordError: '',
    showUsernameError: false,
    usernameError: '',
    hasError: false,
    showMessageError: '',
  });
  const [isSecureText, setIsSecureText] = useState(true);
  const [showError, setShowError] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [login, { data, loading }] = useMutation(classicSignInMutation);
  const [loginWithCode, setLoginWithCode] = useState(false);
  const [getProfile, { data: profileData, loading: profileLoading }] =
    useLazyQuery(profileQuery);

  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const [sendEmail, { loading: loadingSendMail, data: dataSendMail }] =
    useMutation(sendEmailVerificationMutation);
  const { email } = useAuth();

  const {
    orderForm,
    addItem,
    orderform,
    removeItem,
    addCoupon,
    identifyCustomer,
    addSellerCoupon,
    removeCoupon,
    removeSellerCoupon,
    addCustomer,
    addShippingData,
  } = useCart();

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
      const { data, errors } = await login({
        variables: {
          email: loginCredentials.username.trim().toLowerCase(),
          password: loginCredentials.password,
        },
      });
      if (data.classicSignIn === 'Success') {
        const emailHash = await sha256(
          loginCredentials.username.trim().toLowerCase()
        );

        console.log('emailHash', emailHash);

        saveCredentials({
          email: loginCredentials.username.trim().toLowerCase(),
          password: loginCredentials.password,
        });

        OneSignal.setExternalUserId(
          loginCredentials.username.trim().toLowerCase()
        );

        PushIOManager.registerUserId(
          loginCredentials.username.trim().toLowerCase()
        );

        appsFlyer.logEvent(
          'af_login',
          {},
          (res) => {
            console.log('AppsFlyer', res);
          },
          (err) => {
            console.error('AppsFlyer Error', err);
          }
        );

        appsFlyer.setUserEmails(
          {
            emails: [emailHash],
            emailsCryptType: CryptType.SHA256,
          },
          (success) => {
            console.log('appsFlyer setUserEmails success', success);
          },
          (error) => {
            if (error) {
              console.log('Error setting user emails: ', error);
            }
          }
        );

        setEmail(loginCredentials.username.trim().toLowerCase());

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
    console.log('EMAIL ===>', loginCredentials.username.trim().toLowerCase());
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
      <ScrollView>
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
