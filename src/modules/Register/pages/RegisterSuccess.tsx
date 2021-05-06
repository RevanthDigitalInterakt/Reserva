import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
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
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

// TODO: REMOVE THIS, get from the image index.ts
import okImage from "../../../assets/img/ok.png";

import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "RegisterSuccess">;

export const RegisterSuccess: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { repositories } = useSelector((state: ApplicationState) => state);

  const { comeFrom } = route.params;

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
      flex={1}
    >
      <TopBarBackButtonWithoutLogo
        showShadow={false}
        backButtonPress={() => navigation.navigate("LoginAlternative")}
      />
      <Box alignItems="center" justifyContent="center" flex={1}>
        <Box>
          <Typography variant={"tituloSessoes"}>
            Cadastro realizado com sucesso!
          </Typography>
        </Box>
        <Box marginTop="md">
          <Image source={okImage} />
        </Box>
        <Box marginTop="md" alignItems="center">
          <Button
            onPress={() => {
              if (comeFrom == "Profile") {
                navigation.navigate("Profile");
              }

              if (comeFrom == "Menu") {
                navigation.navigate("Home");
              }

              if (comeFrom == "Favorite") {
                navigation.navigate("WishList");
              }

              if (comeFrom == "Checkout") {
                navigation.navigate("DeliveryScreen");
              }
            }}
            fontFamily="nunitoRegular"
            title={"ENTRAR" + comeFrom}
            width={167}
            variant="primarioEstreito"
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
