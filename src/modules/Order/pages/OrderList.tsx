import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, Button, Alert, Icon } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
const OrderList = () => {
  return (
    <>
      <SafeAreaView flex={1} backgroundColor={"white"}>
        <TopBarBackButton showShadow />

        <Box paddingHorizontal={20} justifyContent="flex-start" paddingTop={49}>
          <Typography fontSize={20} fontFamily="reservaSerifRegular">
            Meus pedidos
          </Typography>
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            paddingX={"xxxs"}
            pt="xxxs"
            mt={"xxs"}
            backgroundColor="backgoundInput"
            width={"100%"}
          >
            <Box
              mb={"xxs"}
              width={"100%"}
              height={171}
              backgroundColor={"white"}
            >
              <Box
                height={141}
                borderBottomWidth="hairline"
                borderColor={"backgroundMenuOpened"}
                paddingY={"xxxs"}
                paddingX={"xxxs"}
              >
                <Box flexDirection="row" justifyContent="space-between">
                  <Typography
                    fontSize={16}
                    fontFamily="reservaSerifRegular"
                    color="preto"
                  >
                    Número do pedido
                  </Typography>

                  <Typography
                    fontSize={20}
                    fontFamily="nunitoBold"
                    color="preto"
                  >
                    R$ 1000,00
                  </Typography>
                </Box>
                <Typography
                  fontSize={20}
                  fontFamily="reservaSerifBold"
                  color="vermelhoRSV"
                >
                  12-3456789
                </Typography>
                <Typography
                  style={{ marginTop: 5 }}
                  mt={"micro"}
                  fontSize={14}
                  fontFamily="nunitoBold"
                  color="preto"
                >
                  Entrega prevista: 04/04/2021
                </Typography>
                <Typography
                  fontSize={14}
                  fontFamily="nunitoRegular"
                  color="preto"
                >
                  Endereço de entrega: AV. Castelo Branco, 123, Praia da Costa -
                  Vila Velha - ES - 29123-123
                </Typography>
              </Box>

              <Button
                pt={"xxxs"}
                backgroundColor={"white"}
                height={20}
                width={100}
              >
                <Icon name="ArrowDown" size={20} />
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
