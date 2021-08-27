import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, TextField, Button, Icon } from "reserva-ui";
import { setLocale } from "yup";
import { images } from "../../../assets";
import { useAuth } from "../../../context/AuthContext";
import { recoveryPasswordMutation } from "../../../graphql/login/loginMutations";
import { recoveryPassword } from "../../../graphql/login/recoveryPassword";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { apolloClient } from "../../../services/apolloClient";
import UnderlineInput from "../../Login/components/UnderlineInput";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";
import HeaderBanner from "../componet/HeaderBanner";

export interface ForgotPasswordProps extends StackScreenProps<RootStackParamList, "ForgotNewPassword"> { }


export const ForgotNewPassword: React.FC<ForgotPasswordProps> = ({ navigation, route }) => {

  const { code, email } = route.params

  const [recoveryPassword, { data, loading }] = useMutation(recoveryPasswordMutation)

  const passwordCheckHandler = () => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) != null,
  })

  const enabledButton = () => (passwordsChecker.equal && passwordsChecker.digitsCount && passwordsChecker.uppercase && passwordsChecker.lowercase && passwordsChecker.number)

  const handleUpdaePassword = () => {
    let variables = {
      email,
      code,
      newPassword: passwords.confirm
    }
    recoveryPassword({
      variables
    }).then(x => {
      x.data.recoveryPassword != null ?
        navigation.navigate('ForgotEmailSuccess')
        :
        navigation.navigate('ForgotEmail', {})
    })
  }


  //const [recovery, { data }] = useMutation<{ email: string }>(recoveryPassword)

  const [passwords, setPasswords] = useState({
    first: '',
    confirm: ''
  })

  const [passwordsChecker, setPasswordChecker] = useState(passwordCheckHandler())


  useEffect(() => {
    setPasswordChecker(passwordCheckHandler())
  }, [passwords])




  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { navigation.goBack() }} />
        <Box mx={20} mt={13}>
          <Typography fontFamily='reservaSerifRegular' fontSize={22} >Atualize sua senha</Typography>
          <Box mt={27} >
            <Typography fontFamily='nunitoRegular' fontSize={15} >Por favor, cadastre sua nova senha:</Typography>
          </Box>
          <Box mt={27}>
            <UnderlineInput onChangeText={(text) => setPasswords({ ...passwords, first: text })} placeholder='Digite sua nova senha' />
            <Box mt='sm'>
              <UnderlineInput onChangeText={(text) => setPasswords({ ...passwords, confirm: text })} placeholder='Confirme sua nova senha' />
            </Box>
          </Box>
          <Box mt={22}>
            <Typography>Sua senha deve ter pelo menos:</Typography>
          </Box>
          <Box mx={44} flexDirection='row' flexWrap='wrap' pt={2}>
            <PasswordCheck checked={passwordsChecker.digitsCount} text='8 dígitos' />
            <PasswordCheck checked={passwordsChecker.lowercase} text='1 letra maiúscula' />
            <PasswordCheck checked={passwordsChecker.number} text='1 número' />
            <PasswordCheck checked={passwordsChecker.uppercase} text='1 letra minúscula' />
          </Box>
          <Button mt={28} variant='primarioEstreito' title='ATUALIZAR SENHA' onPress={handleUpdaePassword} disabled={!enabledButton()} inline />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};


export interface PasswordCheckProps {
  text: string,
  checked: boolean
}

export const PasswordCheck: React.FC<PasswordCheckProps> = ({ text, checked }) => {
  const color = checked ? 'verdeSucesso' : 'neutroFrio2'
  return <Box flexDirection='row' alignItems='center' width='50%' mt={15}>
    <Box mt='nano' mr={2}>
      <Icon name='Check' size={16} color={color} />
    </Box>
    <Typography color={color}>
      {text}
    </Typography>
  </Box>
}