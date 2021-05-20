import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Checkbox } from "reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const NotificationProfile: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    whatsapp: true,
    email: false,
    phone: true,
  });

  useEffect(() => {}, []);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton />
      <ScrollView>
        <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant="tituloSessoes">Notificações</Typography>
          </Box>

          <Box py={"xxxs"} alignSelf={"flex-start"}>
            <Typography variant="subtituloSessoes">
              Por onde podemos entrar em contato com você?
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
      <Button title="CONFIRMAR" variant="primarioEstreito" inline />
    </SafeAreaView>
  );
};
