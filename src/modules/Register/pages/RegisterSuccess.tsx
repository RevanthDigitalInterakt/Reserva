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

import okImage from "../../../assets/img/ok.png";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";

export const RegisterSuccess: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { repositories } = useSelector((state: ApplicationState) => state);

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
        backButtonPress={() => navigation.navigate("Login")}
      />
      <Box alignItems="center" justifyContent="center" marginTop="xxl" flex={1}>
        <Box marginTop="xxxs">
          <Typography fontSize={20} fontFamily="reservaSerifRegular">
            Cadastro realizado com sucesso!
          </Typography>
        </Box>
        <Box marginTop="md">
          <Image source={okImage} />
        </Box>
        <Box marginTop="md" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            paddingX="sm"
            title="ENTRAR"
            width={167}
            variant="primarioEstreito"
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
