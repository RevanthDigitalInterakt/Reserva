import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { Typography, Box, TextField, Button } from "reserva-ui";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";

export const ForgotEmail: React.FC = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <TopBarBackButtonWithoutLogo
        showShadow={false}
        backButtonPress={() => navigation.navigate('Login')}
      />
      <Box
        paddingX="micro"
        marginTop="xxl"
      >
        <Box justifyContent="flex-start" marginTop="xxxs">
          <Typography variant={"tituloSessoes"}>
            Esqueci meu e-mail
          </Typography>
        </Box>
      </Box>
      <Box paddingX="micro" flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField
            height={55}
            placeholder="Digite o seu CPF ou CNPJ"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            width={258}
            variant="primarioEstreitoOutline"
            onPress={() => navigation.navigate("ForgotEmailSuccess")}
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
