import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { BackHandler, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Button, Typography } from 'reserva-ui';
import { images } from '../../../assets';
import {
  classicSignInMutation,
  sendEmailVerificationMutation,
} from '../../../graphql/login/loginMutations';
import { useAuth } from '../../../context/AuthContext';
import { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import UnderlineInput from '../components/UnderlineInput';

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export const LoginScreen: React.FC<Props> = ({
  children,
  route,
  navigation,
}) => {
  const { comeFrom } = route.params;
  const { cookie, setCookie } = useAuth();
  //const navigation = useNavigation();
  const [loginCredentials, setLoginCredentials] = React.useState({
    username: '',
    password: '',
    showPasswordError: false,
    passwordError: '',
    showUsernameError: false,
    usernameError: '',
  });
  const [isSecureText, setIsSecureText] = useState(true);
  const [showError, setShowError] = useState(false);
  const [login, { data, loading }] = useMutation(classicSignInMutation);
  const [loginWithCode, setLoginWithCode] = useState(true);
  const [sendEmail, { loading: loadingSendMail, data: dataSendMail }] =
    useMutation(sendEmailVerificationMutation);

  const passwordChecker = () => {
    const password = loginCredentials.password;
    return (
      password.match(/[A-Z]/g) != null &&
      password.match(/[a-z]/g) != null &&
      password.match(/[0-9]/g) != null &&
      password.length >= 8
    );
  };

  const handleLogin = async () => {
    const { data, errors } = await login({
      variables: {
        email: loginCredentials.username,
        password: loginCredentials.password,
      },
    });
    // ! verify login success
    if (data['classicSignIn'] != 'Success' || !passwordChecker()) {
      setLoginCredentials({
        ...loginCredentials,
        password: '',
        showPasswordError: true,
        showUsernameError: true,
        passwordError:
          'Verifique os campos acima e digite um e-mail ou senha válidos',
      });
    } else {
      // console.log(data)
      navigation.navigate('Home');
    }
  };

  const handleLoginCode = () => {
    sendEmail({
      variables: {
        email: loginCredentials.username,
      },
    }).then((data) => {
      navigation.navigate('AccessCode', {
        email: loginCredentials.username,
      });
    });
  };

  useEffect(() => {
    if (comeFrom === 'Profile') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }
  }, []);

  useEffect(() => {
    if (!loading && data?.cookie) {
      console.log('cookie', data.cookie);
      setCookie(data?.cookie);
      AsyncStorage.setItem('@RNAuth:cookie', data?.cookie).then(() => {
        navigation.navigate('Home');
      });
    }
  }, [data]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={() => {
          navigation.navigate('Home');
        }}
      />
      <ScrollView>
        <Box px="xxs" pt="xxs" paddingBottom="xxl">
          <Typography fontFamily="reservaSerifRegular" fontSize={22}>
            Seja bem-vindo novamente!
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
              onChangeText={(text) =>
                setLoginCredentials({ ...loginCredentials, username: text })
              }
            />
            {!loginWithCode && (
              <Box mt="md" width="100%">
                <UnderlineInput
                  placeholder="Digite sua senha"
                  value={loginCredentials.password}
                  showError={loginCredentials.showPasswordError}
                  errorMsg={loginCredentials.passwordError}
                  onChangeText={(text) =>
                    setLoginCredentials({ ...loginCredentials, password: text })
                  }
                />

                <Box mt="micro">
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
              </Box>
            )}
          </Box>
          <Box mt="md" />
          <Button
            title={!loginWithCode ? 'ENTRAR' : 'RECEBER CÓDIGO'}
            inline
            variant="primarioEstreito"
            disabled={loadingSendMail || loading}
            onPress={() => (loginWithCode ? handleLoginCode() : handleLogin())}
          />
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
            onPress={() => setLoginWithCode(!loginWithCode)}
          />
          {/* <Box
            flexDirection="row"
            mt="sm"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center">
              {"Ainda não possui uma conta?"}
            </Typography>
            <Button>
              <Typography style={{ textDecorationLine: "underline" }}>
                Clique para se cadastrar
              </Typography>
            </Button>
          </Box> */}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
