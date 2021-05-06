import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform } from "react-native";
import { Typography, Box, Button, Icon, Image } from "reserva-ui";

interface IOrderProduct {
  obj?: object;
}

const OrderProduct = ({ obj }: IOrderProduct) => {
  //TODO: repassar nesse componente. se possivel trocar com o que ja foi feito anteriormente.
  return (
    <>
      <Box flexDirection="row" mt={"xxs"}>
        <Image
          variant="sm"
          source="https://2516.cdn.simplo7.net/static/2516/sku/vestuario-camisas-camisetas-camisa-safari-masculina-hard-adventure--p-1548699444121.jpeg"
        />
        <Box ml="micro">
          <Typography fontSize={13} fontFamily="nunitoBold">
            Camiseta Básica Reserva
          </Typography>
          <Typography fontSize={11} fontFamily="nunitoRegular">
            Tam: 41
          </Typography>
          <Typography fontSize={11} fontFamily="nunitoRegular">
            Cor: Branca
          </Typography>
          <Box flexDirection="row">
            <Typography
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              De:
            </Typography>
            <Typography
              style={{
                textDecorationLine: "line-through",
                marginLeft: 5,
              }}
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              345,00
            </Typography>
            <Typography
              style={{
                marginLeft: 5,
              }}
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              por
            </Typography>
          </Box>
          <Typography fontSize={18} fontFamily="nunitoBold">
            R$297,00
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderProduct;
