import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { Typography, Box, TextField, Button } from "reserva-ui";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";

export const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <TopBarBackButtonWithoutLogo
        showShadow={false}
        backButtonPress={() => navigation.goBack()}
      />
      <Box paddingX="micro" marginTop="xxl">
        <Box justifyContent="flex-start" marginTop="xxxs">
          <Typography variant={"tituloSessoes"}>Esqueci minha senha</Typography>
        </Box>
      </Box>

      <Box paddingX="micro" flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField height={55} placeholder="Digite seu e-mail" />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            width={258}
            variant="primarioEstreitoOutline"
            onPress={() => navigation.navigate("ForgotNewPassword")}
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
