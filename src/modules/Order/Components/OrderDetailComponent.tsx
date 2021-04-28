import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Platform } from "react-native";
import { Typography, Box, Button, Icon, Image } from "reserva-ui";
import OrderProduct from "./OrderProduct";
interface IOrderDetailComponent {
  obj?: object;
  deliveryState: number;
}

const OrderDetailComponent = ({
  obj,
  deliveryState,
}: IOrderDetailComponent) => {
  const deliveryStateToStyle = () => {
    switch (deliveryState) {
      case 1:
        return (
          <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Pedido feito
          </Typography>
        );
        break;
      case 2:
        return (
          <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Confirmação
          </Typography>
        );
        break;
      case 3:
        return (
          <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Envio
          </Typography>
        );
        break;
      case 4:
        return (
          <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Entrega
          </Typography>
        );
        break;
    }
  };

  const deliveryStateToMsg = () => {
    switch (deliveryState) {
      case 1:
        return (
          <>
            <Typography
              style={{ marginBottom: 7, marginTop: 11 }}
              fontSize={14}
              fontFamily="nunitoBold"
            >
              Seu pedido foi feito com sucesso.
            </Typography>
            <Typography fontSize={14} fontFamily="nunitoRegular">
              Aguardamos a confirmação do pagamento para seguirmos com a entrega
            </Typography>
          </>
        );
        break;
      case 2:
        return (
          <>
            <Typography
              style={{ marginBottom: 7, marginTop: 11 }}
              fontSize={14}
              fontFamily="nunitoBold"
            >
              Pagamento recebido.
            </Typography>
            <Typography fontSize={14} fontFamily="nunitoRegular">
              Sua compra foi confirmada com sucesso
            </Typography>
          </>
        );
        break;
      case 3:
        return (
          <>
            <Typography
              style={{ marginBottom: 7, marginTop: 11 }}
              fontSize={14}
              fontFamily="nunitoBold"
            >
              Seu pedido saiu para entrega.
            </Typography>
          </>
        );
        break;
      case 4:
        return (
          <>
            <Typography
              style={{ marginBottom: 7, marginTop: 11 }}
              fontSize={14}
              fontFamily="nunitoBold"
            >
              Sua compra foi entregue com sucesso.
            </Typography>
          </>
        );
        break;
    }
  };

  return (
    <>
      <Box>
        <Box mt={"xxs"} flexDirection="row" justifyContent="space-between">
          {deliveryStateToStyle()}
          {/* <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Confirmação
          </Typography> */}
          <Typography
            fontFamily="reservaSerifBold"
            fontSize={20}
            color="vermelhoRSV"
          >
            12-3456789
          </Typography>
        </Box>
        {deliveryStateToMsg()}

        {/* aqui fazer o map de produtos comprados */}
        <OrderProduct />

        {/* //preços */}
        <Box mt="xs" flexDirection="row" justifyContent="space-between">
          <Typography fontSize={12} fontFamily="nunitoSemiBold">
            Subtotal
          </Typography>
          <Typography fontSize={13} fontFamily="nunitoSemiBold">
            R$ 1254,00
          </Typography>
        </Box>
        <Box mt="micro" flexDirection="row" justifyContent="space-between">
          <Typography fontSize={12} fontFamily="nunitoSemiBold">
            Frete
          </Typography>
          <Typography fontSize={13} fontFamily="nunitoSemiBold">
            R$ 1254,00
          </Typography>
        </Box>
        <Box mt="micro" flexDirection="row" justifyContent="space-between">
          <Typography fontSize={12} fontFamily="nunitoSemiBold">
            Descontos
          </Typography>
          <Typography fontSize={13} fontFamily="nunitoSemiBold">
            - R$ 254,00
          </Typography>
        </Box>
        <Box mt="xxxs" flexDirection="row" justifyContent="space-between">
          <Typography fontSize={12} fontFamily="nunitoSemiBold">
            Total
          </Typography>
          <Typography fontSize={20} fontFamily="nunitoBold">
            R$ 1000,00
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderDetailComponent;
