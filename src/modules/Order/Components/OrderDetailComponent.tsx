import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Typography, Box, Button, Icon, Image } from '@usereservaapp/reserva-ui';
import { PriceCustom } from '../../Checkout/components/PriceCustom';
import OrderProduct from './OrderProduct';
import React, { useState, useEffect } from 'react';
import { IOrderId } from '../../../context/CartContext';

export type IOrderData = {
  orderId: string;
  status: string;
  statusDescription: string;
  state: string;
  shippingData: {
    logisticsInfo: {
      itemIndex: string;
      selectedSla: string;
      slas: {
        shippingEstimate: string;
        shippingEstimateDate: string;
      };
    };
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    };
  };
  items: [
    {
      name: string;
      price: string;
      sellingPrice: string;
      quantity: string;
      imageUrl: string;
      measurementUnit: string;
    }
  ];
  value: number;
  totals: [
    {
      id: string;
      name: string;
      value: string;
    }
  ];
  paymentData: {
    transactions: {
      isActive: string;
      merchantName: string;
      payments: {
        paymentSystemName: string;
        paymentSystem: string;
        lastDigits: string;
      };
    };
  };
};

interface IOrderDetailComponent {
  data: IOrderId;
  deliveryState: number;
}

const OrderDetailComponent = ({ data }: IOrderDetailComponent) => {
  // const deliveryStateToStyle = () => {
  //   switch (data.status) {
  //     case 1:
  //       return (
  //         <Typography fontFamily="reservaSerifRegular" fontSize={20}>
  //           Pedido feito
  //         </Typography>
  //       );
  //       break;
  //     case 2:
  //       return (
  //         <Typography fontFamily="reservaSerifRegular" fontSize={20}>
  //           Confirmação
  //         </Typography>
  //       );
  //       break;
  //     case 3:
  //       return (
  //         <Typography fontFamily="reservaSerifRegular" fontSize={20}>
  //           Envio
  //         </Typography>
  //       );
  //       break;
  //     case 4:
  //       return (
  //         <Typography fontFamily="reservaSerifRegular" fontSize={20}>
  //           Entrega
  //         </Typography>
  //       );
  //       break;
  //     case 6:
  //       return (
  //         <Typography fontFamily="reservaSerifRegular" fontSize={20}>
  //           Cancelado
  //         </Typography>
  //       );
  //       break;
  //   }
  // };

  // const deliveryStateToMsg = () => {
  //   switch (deliveryState) {
  //     case 1:
  //       return (
  //         <>
  //           <Typography
  //             style={{ marginBottom: 7, marginTop: 11 }}
  //             fontSize={14}
  //             fontFamily="nunitoBold"
  //           >
  //             Seu pedido foi feito com sucesso.
  //           </Typography>
  //           <Typography fontSize={14} fontFamily="nunitoRegular">
  //             Aguardamos a confirmação do pagamento para seguirmos com a entrega
  //           </Typography>
  //         </>
  //       );
  //       break;
  //     case 2:
  //       return (
  //         <>
  //           <Typography
  //             style={{ marginBottom: 7, marginTop: 11 }}
  //             fontSize={14}
  //             fontFamily="nunitoBold"
  //           >
  //             Pagamento recebido.
  //           </Typography>
  //           <Typography fontSize={14} fontFamily="nunitoRegular">
  //             Sua compra foi confirmada com sucesso
  //           </Typography>
  //         </>
  //       );
  //       break;
  //     case 3:
  //       return (
  //         <>
  //           <Typography
  //             style={{ marginBottom: 7, marginTop: 11 }}
  //             fontSize={14}
  //             fontFamily="nunitoBold"
  //           >
  //             Seu pedido saiu para entrega.
  //           </Typography>
  //         </>
  //       );
  //       break;
  //     case 4:
  //       return (
  //         <>
  //           <Typography
  //             style={{ marginBottom: 7, marginTop: 11 }}
  //             fontSize={14}
  //             fontFamily="nunitoBold"
  //           >
  //             Sua compra foi entregue com sucesso.
  //           </Typography>
  //         </>
  //       );
  //       break;
  //   }
  // };

  return (
    <>
      <Box>
        <Box mt={'xxs'} flexDirection="row" justifyContent="space-between">
          {/* {deliveryStateToStyle()} */}
          <Typography
            fontFamily="reservaDisplayRegular"
            fontSize={20}
            color="vermelhoRSV"
          >
            {data && data.orderId}
          </Typography>
        </Box>
        {/* {deliveryStateToMsg()} */}
        {data && data.items &&
          data.items.map((item, index) => <OrderProduct key={`orderItem-${index}`} orderItem={item} />)}

        {/* //preços */}
        {data &&
          <Box mt="xs" flexDirection="row" justifyContent="space-between">
            <Typography variant="precoAntigo3">Subtotal</Typography>
            <PriceCustom
              fontFamily={'nunitoSemiBold'}
              sizeInterger={15}
              sizeDecimal={11}
              num={
                data?.totals?.find(({ id }) => id === 'Items')?.value / 100 || 0
              }
            />
          </Box>
        }
        {data &&
          <Box mt="micro" flexDirection="row" justifyContent="space-between">
            <Typography variant="precoAntigo3">Frete</Typography>

            <PriceCustom
              fontFamily={'nunitoSemiBold'}
              sizeInterger={15}
              sizeDecimal={11}
              num={
                data.totals?.find(({ id }) => id === 'Shipping')?.value / 100 || 0
              }
            />
          </Box>
        }
        {data &&
          <Box mt="micro" flexDirection="row" justifyContent="space-between">
            <Typography variant="precoAntigo3">Descontos</Typography>
            <PriceCustom
              fontFamily={'nunitoSemiBold'}
              sizeInterger={15}
              negative={true}
              sizeDecimal={11}
              num={Math.abs(data.totals?.find(({ id }) => id === 'Discounts')?.value / 100 || 0)}
            />
          </Box>
        }
        {data &&
          <Box
            mt="xxxs"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="precoAntigo3">Total</Typography>
            <PriceCustom
              fontFamily={'nunitoBold'}
              sizeInterger={20}
              sizeDecimal={11}
              num={data.value / 100}
            />
          </Box>
        }
      </Box>
    </>
  );
};

export default OrderDetailComponent;
