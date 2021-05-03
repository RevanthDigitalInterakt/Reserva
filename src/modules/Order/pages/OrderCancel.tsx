import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Typography, Box, Button, Alert, Icon } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

type ItemContactProps = {
  number: string;
  type: string;
};

const ItemContact = ({ number, type }: ItemContactProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        switch (type) {
          case "wp":
            Linking.openURL(
              `whatsapp://send?text=Olá quero comprar!&phone=${number}`
            );
            break;
          case "phone":
            Linking.openURL(`tel:${number}`);
            break;
        }
      }}
    >
      <Box
        border={1}
        borderColor={"neutroFrio1"}
        borderRadius={"nano"}
        p={"xxxs"}
        alignItems={"center"}
        mb={"xxs"}
      >
        <Box flexDirection={"row"}>
          <Icon
            name={type == "wp" ? "WhatsappBg" : "PhoneBg"}
            mr={"xxxs"}
            color={type == "wp" ? "verdeSucesso" : "neutroFrio2"}
            size={20}
          />
          <Typography fontSize={15}>{number}</Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const OrderList = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView flex={1} backgroundColor={"white"}>
        <TopBarBackButton showShadow />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Box
            mb="xxxs"
            paddingX="xxxs"
            justifyContent="flex-start"
            paddingTop={"md"}
          >
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Cancelar pedido
            </Typography>
          </Box>
          <Box paddingX="xxxs" mb="xxs">
            <Typography fontSize={15} fontFamily="nunitoRegular">
              {`Entre em contato conosco por telefone que nós providenciaremos a devolução.\n\n`}
              {`Você precisará informar o seu CPF, o número do pedido e o produto a ser devolvido.`}
            </Typography>
          </Box>
          <Box paddingX="xxxs">
            <Typography
              fontSize={12}
              fontFamily="nunitoRegular"
              color={"neutroFrio2"}
            >
              Obs: De acordo com o CDC (Código de Defesa do Consumidor), a
              solicitação de cancelamento de compras virtuais deve ser feita em
              até 7 dias úteis/corridos após a data de recebimento.
            </Typography>
          </Box>

          <Box
            paddingX="xxxs"
            mt={"xxs"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Box width={"45%"}>
              <Box mb={"xxxs"}>
                <Typography fontSize={15} textAlign={"center"}>
                  Rio de Janeiro e regiões:
                </Typography>
              </Box>

              <ItemContact number={"2108-4990"} type={"wp"} />
              <ItemContact number={"2108-4990"} type={"phone"} />
            </Box>

            <Box width={"45%"}>
              <Box mb={"xxxs"}>
                <Typography fontSize={15} textAlign={"center"}>
                  São Paulo e demais estados:
                </Typography>
              </Box>

              <ItemContact number={"2108-4990"} type={"wp"} />
              <ItemContact number={"2108-4990"} type={"phone"} />
            </Box>
          </Box>

          <Box paddingY="nano" alignSelf="center" mt="xl">
            <Button
              inline
              onPress={() => {
                navigation.goBack();
              }}
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
