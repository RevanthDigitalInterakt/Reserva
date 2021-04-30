import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, Button, Alert, Icon } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import Order from "../Components/Order";
const OrderList = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView flex={1} backgroundColor={"white"}>
        <TopBarBackButton showShadow />

        <Box
          mb="xxxs"
          paddingHorizontal={20}
          justifyContent="flex-start"
          paddingTop={"md"}
        >
          <Typography fontSize={20} fontFamily="reservaSerifRegular">
            Cancelar pedido
          </Typography>
        </Box>
        <ScrollView
          contentContainerStyle={{ flex: 1, marginHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Box mb="xxs">
            <Typography fontSize={15} fontFamily="nunitoRegular">
              De acordo com o CDC (Código de Defesa do Consumidor), a
              solicitação de cancelamento de compras virtuais deve ser feita em
              até 7 dias úteis/corridos após a data de recebimento.
            </Typography>
          </Box>
          <Typography fontSize={15} fontFamily="nunitoRegular">
            Entre em contato conosco clicando aqui ou pelo telefone:
            011.2388-8280 - SP e demais estados / 021.2108-4990 - RJ que nós
            providenciaremos a devolução. Você precisará informar o seu CPF, o
            número do pedido e o produto a ser devolvido.
          </Typography>

          <Box width="80%" alignSelf="center" mt="xl">
            <Button
              onPress={() => {
                navigation.goBack();
              }}
              inline
              title="RETORNAR AO PEDIDO"
              variant="primarioEstreitoOutline"
            />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
