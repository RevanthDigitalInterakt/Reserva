import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { Typography, Box, TextField, Button } from "reserva-ui";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";

export const ForgotEmailSuccess: React.FC = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <TopBarBackButtonWithoutLogo
        showShadow={false}
        backButtonPress={() => navigation.navigate('ForgotEmail')}
      />
      <Box
        paddingX="micro"
        marginTop="xxl"
        marginBottom="sm"
      >
        <Box justifyContent="flex-start" marginTop="xxxs">
          <Typography fontSize={20} fontFamily="reservaSerifRegular">
            Esqueci meu e-mail
          </Typography>
        </Box>
        <Box justifyContent="flex-start" marginTop="nano">
          <Typography fontSize={15} fontFamily="nunitoRegular">
            Um código de acesso foi enviado para o e-mail cadastrado, jo****@email.com.
          </Typography>
        </Box>
        <Box justifyContent="flex-start" marginTop="nano">
          <Typography fontSize={15} fontFamily="nunitoRegular">
            Verifique sua caixa de e-mail e siga as orientações enviadas.
          </Typography>
        </Box>
      </Box>
      <Box paddingX="micro" flex={1}>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            width={258}
            variant="primarioEstreitoOutline"
            onPress={() => navigation.navigate("Login")}
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
