import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, TextField, Button, Icon } from "reserva-ui";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";

export const ForgotNewPassword: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <TopBarBackButtonWithoutLogo
        showShadow={false}
        backButtonPress={() => navigation.navigate('ForgotPassword')}
      />
      <ScrollView>
        <Box marginTop="xxl">
          <Box paddingX="micro" marginTop="xxxs">
            <Typography variant={"tituloSessoes"}>
              Nova senha
            </Typography>
          </Box>
        </Box>
        <Box paddingX="micro" flex={1}>
          <Box marginTop="sm" marginBottom="nano">
            <TextField
              secureTextEntry
              height={55}
              placeholder="Digite sua nova senha"
              iconRight={
                <Box ml="nano">
                  <Icon color="neutroFrio2" name="EyeOpen" size={25} />
                </Box>
              }
            />
            <Box marginTop="quarck">
              <Typography
                color="neutroFrio2"
                fontFamily="nunitoRegular"
                fontSize={13}
              >
                No mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas
                e números.
              </Typography>
            </Box>
          </Box>
          <Box marginTop="xxxs" marginBottom="nano">
            <TextField
              secureTextEntry
              height={52}
              placeholder="Repita a senha"
              iconRight={
                <Box ml="nano">
                  <Icon color="neutroFrio2" name="EyeOpen" size={25} />
                </Box>
              }
            />
          </Box>
          <Box marginTop="xs" alignItems="center">
            <Button
              fontFamily="nunitoRegular"
              title="CONTINUAR"
              onPress={() => navigation.navigate("LoginAlternative")}
              width={258}
              variant="primarioEstreitoOutline"
              mb="nano"
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
