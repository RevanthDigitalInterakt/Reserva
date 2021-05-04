import * as React from "react";
import { SafeAreaView } from "react-native";
import { Typography, Box, TextField, Button } from "reserva-ui";
import { IUserData } from "../Wizard";

export const RegisterStep1: React.FC<{
  nextStep: () => void;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  userData: IUserData;
}> = ({ nextStep, setUserData, userData }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <Box marginTop="xxl" paddingX="micro" flex={1}>
        <Box marginTop="xs">
          <Typography variant={"tituloSessoes"}>
            Para começar seu cadastro, por favor, digite o seu CPF ou CNPJ
          </Typography>
        </Box>
        
        <Box marginTop="sm" marginBottom="nano">
          <TextField
            height={55}
            value={userData.cpf}
            onChangeText={(text) => setUserData({ ...userData, cpf: text })}
            placeholder="Digite seu e-mail ou CPF ou CNPJ"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            onPress={() => nextStep()}
            width={258}
            variant="primarioEstreitoOutline"
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
