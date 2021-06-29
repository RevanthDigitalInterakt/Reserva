import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Typography, Box, TextField, Button } from "reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import UnderlineInput from "../../Login/components/UnderlineInput";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";
import HeaderBanner from "../componet/HeaderBanner";

export interface ForgotEmailProps extends StackScreenProps<RootStackParamList, "ForgotEmail"> { };

export const ForgotEmail: React.FC<ForgotEmailProps> = ({ navigation }) => {
  //const navigation = useNavigation();

  const [email, setEmail] = useState('')

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { navigation.goBack() }} />
      <Box mx={20} mt={13}>
        <Typography fontFamily='reservaSerifRegular' fontSize={22} >Atualize sua senha</Typography>
        <Box mt={27} >
          <Typography fontFamily='nunitoRegular' fontSize={15} >Para alterar a senha, digite seu e-mail abaixo:</Typography>
        </Box>
        <Box mt={33}>
          <UnderlineInput onChangeText={(text) => { setEmail(text) }} placeholder='Digite seu e-mail' />
        </Box>
        <Button mt={55} variant='primarioEstreito' title='ENVIAR E-MAIL' onPress={() => { navigation.navigate('ForgotAccessCode', { email }) }} disabled={email.length <= 0} inline />

      </Box>
    </SafeAreaView >
  );
};
