import { gql } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { Typography, Box, TextField, Button, Image } from "@usereservaapp/reserva-ui";
import { setLocale } from "yup";
import { apolloClient } from "../../../services/apolloClient";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";

import { images } from "../../../assets/";
import HeaderBanner from "../componet/HeaderBanner";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";
const width = Dimensions.get("window").width;

export interface ForgotPasswordProps
  extends StackScreenProps<RootStackParamList, "ForgotPassword"> {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <HeaderBanner imageHeader={images.headerLogin} />
      <Box paddingX="micro" marginTop="xxl">
        <Box justifyContent="flex-start" marginTop="xxxs">
          <Typography variant={"tituloSessoes"}>Esqueci minha senha</Typography>
        </Box>
      </Box>

      <Box paddingX="micro" flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField
            value={email}
            onChangeText={(value) => setEmail(value)}
            height={55}
            placeholder="Digite seu e-mail"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            width={258}
            variant="primarioEstreitoOutline"
            onPress={() => {
              AsyncStorage.setItem("recoveryEmail", email);
              navigation.navigate("ForgotAccessCode");
            }}
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
