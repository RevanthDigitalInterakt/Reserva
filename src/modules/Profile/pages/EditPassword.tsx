import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const EditPassword: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password: "*****",
    password_confirm: "*****",
  });

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton />
      <ScrollView>
        <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"micro"} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Alterar senha
            </Typography>
          </Box>

          <Box mt={"xxxs"}>
            <Box mb={"micro"}>
              <TextField
                label={"Digite sua nova senha"}
                value={data.password}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
                iconRight={
                  <Box ml="nano">
                    <Icon color="neutroFrio2" name="EyeOff" size={25} />
                  </Box>
                }
                touched={true}
                error={
                  "Introduza uma senha segura, com no mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas e números."
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                label={"Repita a senha"}
                value={data.password_confirm}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
                touched={true}
                error={"As senhas não correspondem."}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Button title="CONFIRMAR" variant="primarioEstreito" inline />
    </SafeAreaView>
  );
};
