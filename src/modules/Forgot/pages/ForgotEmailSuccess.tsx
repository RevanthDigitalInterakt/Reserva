import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, TextField, Button } from "@danilomsou/reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import CodeInput from "../../Login/components/CodeInput";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";
import HeaderBanner from "../componet/HeaderBanner";

export interface ForgotAccessCodeProps extends StackScreenProps<RootStackParamList, "ForgotEmailSuccess"> { };

export const ForgotEmailSuccess: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { navigation.goBack() }} />
        <Box mx={20} mt={65}>
          <Typography fontFamily='reservaSerifRegular' fontSize={35}>Senha alterada com sucesso!</Typography>
          <Button 
            mt={106} 
            variant='primarioEstreito' 
            title='VOLTAR AO LOGIN' 
            onPress={() => { 
              navigation.navigate("Login")
            }} 
            inline
          />

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
