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
            color={type == "wp" ? "verdeSucesso" : "neutroFrio2"}
            mr={"nano"}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            mb="xxxs"
            paddingX="xxxs"
            justifyContent="flex-start"
            paddingTop={"md"}
          >
            <Typography variant={"tituloSessoes"}>Cancelar pedido</Typography>
          </Box>
          <Box paddingX="xxxs" mb="xxxs">
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
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box flexDirection={"row"} mb={"xxs"}>
              <Box
                width={"50%"}
                borderRightWidth={1}
                borderRightColor={"divider"}
              >
                <Typography
                  fontFamily={"nunitoRegular"}
                  fontSize={15}
                  textAlign={"center"}
                >
                  Rio de Janeiro
                </Typography>
                <Typography
                  fontFamily={"nunitoRegular"}
                  fontSize={15}
                  textAlign={"center"}
                >
                  e regiões:
                </Typography>
              </Box>

              <Box width={"50%"}>
                <Typography
                  fontFamily={"nunitoRegular"}
                  fontSize={15}
                  textAlign={"center"}
                >
                  São Paulo e
                </Typography>

                <Typography
                  fontFamily={"nunitoRegular"}
                  fontSize={15}
                  textAlign={"center"}
                >
                  demais estados:
                </Typography>
              </Box>
            </Box>

            <Box flexDirection={"row"} justifyContent={"space-between"}>
              <Box width={"43%"}>
                <ItemContact number={"2108-4990"} type={"wp"} />
                <ItemContact number={"2108-4990"} type={"phone"} />
              </Box>

              <Box width={"43%"}>
                <ItemContact number={"2108-4990"} type={"wp"} />
                <ItemContact number={"2108-4990"} type={"phone"} />
              </Box>
            </Box>
          </Box>

          <Box paddingY="micro" alignSelf="center" mt={"micro"}>
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
