import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform } from "react-native";
import { Typography, Box, Button, Icon, Image } from "reserva-ui";

type IOrderItemData = {
  name: string;
  price: string;
  sellingPrice: string;
  quantity: string;
  imageUrl: string;
  measurementUnit: string;
}

interface IOrderProduct {
  orderItem: IOrderItemData;
}

const OrderProduct = ({ orderItem }: IOrderProduct) => {
  //TODO: repassar nesse componente. se possivel trocar com o que ja foi feito anteriormente.
  return (
    <>
      <Box flexDirection="row" mt={"xxs"}>
        <Box>
          <Image
            variant="sm"
            source={orderItem.imageUrl}
          />
        </Box>

        <Box ml="micro" flex={1}>
          <Box mb="nano">
            <Typography fontSize={13} fontFamily="nunitoBold">
              {orderItem.name.split(" - ")[0]}
            </Typography>
          </Box>
          <Box flexDirection="row" mb="micro">
            <Box mr="xxs">
              <Typography fontSize={11} fontFamily="nunitoRegular">
                Tam: 41
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={11} fontFamily="nunitoRegular">
                Cor: Branca
              </Typography>
            </Box>
          </Box>

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
              {orderItem.price}
            </Typography>
            {/* <Typography
              style={{
                marginLeft: 5,
              }}
              color="neutroFrio2"
              fontSize={11}
              fontFamily="nunitoRegular"
            >
              por
            </Typography> */}
          </Box>
          <Typography fontSize={18} fontFamily="nunitoBold">
            R$ {orderItem.sellingPrice}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderProduct;
