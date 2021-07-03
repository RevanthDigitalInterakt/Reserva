import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, BackHandler } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Typography,
  Box,
  TextField,
  Toggle,
  Button,
  SocialButton,
  Icon,
  Image,
} from "reserva-ui";

import HeaderBanner from "../../Forgot/componet/HeaderBanner";
import { images } from "../../../assets";
import UnderlineInput from "../components/UnderlineInput";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation } from "@apollo/client";
import { classicSignInMutation } from "../../../graphql/login/loginMutations";
import { useAuth } from "../../../context/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";
import id from "date-fns/esm/locale/id/index.js";

type Props = StackScreenProps<RootStackParamList, "LoginAlternative">;

export const LoginScreen: React.FC<Props> = ({ children, route }) => {
  const { comeFrom } = route.params;
  const { cookie, setCookie } = useAuth();
  const navigation = useNavigation();
  const [loginCredentials, setLoginCredentials] = React.useState({
    username: "",
    password: "",
  });
  const [isSecureText, setIsSecureText] = useState(true);
  const [login, { data, loading: loadngClassicLogin }] = useMutation(classicSignInMutation);
  const [loginWithCode, setLoginWithCode] = useState(true)

  const handleLogin = () => {
    login({
      variables: {
        email: loginCredentials.username,
        password: loginCredentials.password
      }
    })
  }

  useEffect(() => {
    if (comeFrom === "Profile") {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate("Home");
        return true;
      });
    }
  }, [])

  useEffect(() => {
    if (!loadngClassicLogin && data?.cookie) {
      setCookie(data?.cookie)
      AsyncStorage.setItem('@RNAuth:cookie', data?.cookie).then(() => {
        navigation.navigate("Home");
      });
    }
  }, [data]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <HeaderBanner loading={loadngClassicLogin} imageHeader={images.headerLogin} onClickGoBack={() => {
        navigation.navigate("Home");
      }} />
      <ScrollView>
        <Box px="xxs" pt="xxs" paddingBottom="xxl">
          <Typography fontFamily='reservaSerifRegular' fontSize={22}>
            Seja bem-vindo novamente!
          </Typography>

          <Box mt='xxs'>
            <Box marginBottom="xxxs">
              <Typography variant='tituloSessao'>
                Insira seu e-mail para continuar:
              </Typography>
            </Box>
            <UnderlineInput
              placeholder='Digite seu e-mail'
              errorMsg='Digite um e-mail válido'
              showError={false}
              onChangeText={
                (text) => setLoginCredentials(
                  { ...loginCredentials, username: text }
                )
              }
            />
            {
              !loginWithCode &&
              <Box mt='md' width='100%'>
                <UnderlineInput
                  placeholder='Digite sua senha'
                  isSecureText={true}
                  onChangeText={
                    (text) => setLoginCredentials(
                      { ...loginCredentials, password: text }
                    )
                  }
                />

                <Box mt='micro'>

                  <TouchableOpacity>
                    <Typography style={{ textDecorationLine: 'underline' }}>
                      Esqueci minha senha
                    </Typography>
                  </TouchableOpacity>
                </Box>
              </Box>
            }

          </Box>
          <Box mt='md' />
          <Button
            title={!loginWithCode ? 'ENTRAR' : 'RECEBER CÓDIGO'}
            inline
            variant='primarioEstreito'
            onPress={() => handleLogin()}
          />
          <Box my={50}  >
            <Typography variant='tituloSessao' textAlign='center'>OU</Typography>
          </Box>
          <Button
            title={loginWithCode ? 'ENTRAR COM LOGIN E SENHA' : 'RECEBER CÓDIGO DE ACESSO'}
            inline variant='primarioEstreitoOutline'
            onPress={() => setLoginWithCode(!loginWithCode)} />
          <Box flexDirection='row' mt='sm'>
            <Typography>
              {'Ainda não possui uma conta? '}
            </Typography>
            <Button>
              <Typography style={{ textDecorationLine: 'underline' }}>
                Clique para se cadastrar
              </Typography>
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
