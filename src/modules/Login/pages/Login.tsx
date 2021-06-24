import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import { ApplicationState } from "../../../store";

import logo from "../../../assets/img/logo.png";
import HeaderBanner from "../../Forgot/componet/HeaderBanner";
import { images } from "../../../assets";
import UnderlineInput from "../components/UnderlineInput";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export const LoginScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSecureText, setIsSecureText] = useState(true);

  const [loginWithCode, setLoginWithCode] = useState(true)

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { }} />
      <ScrollView>
        <Box px={20} pt={13}>
          <Typography fontFamily='reservaSerifRegular' fontSize={22}>
            Seja bem-vindo novamente!
          </Typography>

          <Box mt='xxs'>
            <Typography variant='tituloSessao'>
              Insira seu e-mail para continuar:
            </Typography>

            <UnderlineInput placeholder='Digite seu e-mail' errorMsg='Digite um e-mail válido' showError={false} />
            {
              !loginWithCode &&
              <Box mt='md' width='100%'>
                <UnderlineInput placeholder='Digite sua senha' isSecureText={true} />

                <Box mt='quarck'>

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
          <Button title='RECEBER CÓDIGO' inline variant='primarioEstreito' onPress={() => navigation.navigate('AccessCode')} />
          <Box my={50}  >
            <Typography variant='tituloSessao' textAlign='center'>UO</Typography>
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
