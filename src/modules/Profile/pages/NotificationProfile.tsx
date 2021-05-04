import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Checkbox } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const NotificationProfile: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    whatsapp: true,
    email: false,
    phone: true,
  });

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant="tituloSessoes">
              Notificações
            </Typography>
          </Box>

          <Box alignSelf={"flex-start"}>
            <Typography variant="subtituloSessoes">
              Qual é o tipo de conteúdo que você quer receber? Marque abaixo as
              opções de contato:
            </Typography>
          </Box>

          <Box mt={"xxxs"}>
            <Box mb={"xxs"} flexDirection="row">
              <Checkbox
                width={"100%"}
                checked={data.whatsapp}
                onCheck={() => {
                  setData({ ...data, ...{ whatsapp: !data.whatsapp } });
                }}
                optionName={"Whatsapp"}
              />
            </Box>

            <Box mb={"xxs"} flexDirection="row">
              <Checkbox
                width={"100%"}
                checked={data.email}
                onCheck={() => {
                  setData({ ...data, ...{ email: !data.email } });
                }}
                optionName={"E-mail"}
              />
            </Box>

            <Box mb={"xxs"} flexDirection="row">
              <Checkbox
                width={"100%"}
                checked={data.phone}
                onCheck={() => {
                  setData({ ...data, ...{ phone: !data.phone } });
                }}
                optionName={"Notificações do celular"}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>

      <Box bottom={0} justifyContent={"flex-end"}>
        <Button title="CONFIRMAR" variant={"primarioMaior"}></Button>
      </Box>
    </SafeAreaView>
  );
};
