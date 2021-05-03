import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Button, Icon, Divider, TextField } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";

export const PixScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box marginBottom={"xxxs"}>
            <Typography fontFamily={"reservaSerifRegular"} fontSize={20}>
              PIX
            </Typography>
          </Box>

          <Box marginBottom={"xxs"}>
            <Typography variant={"tituloSessao"}>
              O QR Code e o código númerico serão exibidos após a confirmação da
              compra e poderá ser efetuado pagamento em qualquer banco pelo
              Internet Banking.
            </Typography>
          </Box>
          <Information
            number={"1"}
            description={
              "Ao finalizar a compra será exibido um QR Code e um código númerico."
            }
            divider
          />

          <Information
            number={"2"}
            description={
              "Copie o código e faça o pagamento no aplicativo da sua instituição financeira."
            }
            divider
          />

          <Information
            number={"3"}
            description={
              "Quando realizado, o seu pedido será liberado em nosso aplicativo."
            }
          />
        </Box>
      </ScrollView>

      <Button
        onPress={() =>
          navigation.navigate("SummaryScreen", { paymentType: "PIX" })
        }
        title="RESUMO"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};

interface IInformation {
  number?: string;
  description?: string;
  divider?: boolean;
}
const Information = ({ number, description, divider }: IInformation) => {
  return (
    <>
      <Box flexDirection={"row"}>
        <Box
          height={40}
          width={40}
          bg={"neutroFrio2"}
          borderRadius={"infinity"}
          marginRight={"xxxs"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            fontFamily={"reservaSerifRegular"}
            fontSize={20}
            color={"white"}
          >
            {number}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={"tituloSessao"}>{description}</Typography>
        </Box>
      </Box>
      {divider && <Divider marginY={"xxxs"} variant={"fullWidth"} />}
    </>
  );
};
