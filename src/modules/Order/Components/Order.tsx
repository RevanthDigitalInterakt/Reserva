import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Typography, Box, Button, Icon } from "reserva-ui";

interface IOrder {
  onPress?: () => void;
  delivered?: boolean;
  pixPending?: boolean;
  obj?: object;
}

const Order = ({ delivered, pixPending, onPress }: IOrder) => {
  // TODO: na hr da integração remover o delivered e OnPress e tratar aqui dentro do componente. foi usado apenas para demonstração.
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <Box
        style={{ elevation: 10 }}
        boxShadow={Platform.OS === "ios" ? "topBarShadow" : null}
        mt="xxxs"
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

            <Typography fontSize={20} fontFamily="nunitoBold" color="preto">
              R$ 1000,00
            </Typography>
          </Box>
          <Typography
            fontSize={20}
            fontFamily="reservaDisplayRegular"
            color="vermelhoRSV"
          >
            12-3456789
          </Typography>
          {pixPending && (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                style={{ marginTop: 5, marginBottom: 5 }}
                mt={"micro"}
                fontSize={14}
                fontFamily="nunitoBold"
                color="preto"
              >
                Pagamento pendente - PIX
              </Typography>
              <Box flexDirection="row" alignItems="center">
                <Box marginRight="nano">
                  <Icon name="Clock" size={15} />
                </Box>
                <Typography>21:30</Typography>
              </Box>
            </Box>
          )}
          {delivered && (
            <Typography
              style={{ marginTop: 5, marginBottom: 5 }}
              mt={"micro"}
              fontSize={14}
              fontFamily="nunitoBold"
              color="verdeSucesso"
            >
              Produto entregue
            </Typography>
          )}
          {!delivered && !pixPending && (
            <Typography
              style={{ marginTop: 5, marginBottom: 5 }}
              mt={"micro"}
              fontSize={14}
              fontFamily="nunitoBold"
              color="preto"
            >
              Entrega prevista: 04/04/2021
            </Typography>
          )}

          <Typography fontSize={14} fontFamily="nunitoRegular" color="preto">
            Endereço de entrega: AV. Castelo Branco, 123, Praia da Costa - Vila
            Velha - ES - 29123-123
          </Typography>
        </Box>

        <Button pt={"xxxs"} backgroundColor={"white"} height={20} width={100}>
          <Icon name="ArrowDown" size={20} />
        </Button>
      </Box>
    </TouchableOpacity>
  );
};

export default Order;
