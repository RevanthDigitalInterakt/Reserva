import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Typography, Box, Button, Icon, Divider } from 'reserva-ui';
import { stringToReal } from '../../../utils/stringToReal';
import { useState } from 'react';

type IOrderData = {
  orderId: string;
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
  status: string;
  value: string;
  totals: {
    id: string;
    name: string;
    value: string;
  };
  items: {
    id: string;
    name: string;
  };
};

interface IOrder {
  onPress?: () => void;
  delivered?: boolean;
  pixPending?: boolean;
  obj?: object;
  data: IOrderData;
}

const Order = ({ data }: IOrder) => {
  const navigation = useNavigation();
  const [order, setOrder] = useState({
    ...data,
    status: data.state || data.status,
  });

  const getTime = () => {
    const date = new Date(order.creationDate);
    return `${date.getHours() + 3}:${date.getMinutes()}`;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetail', {
          order,
        });
      }}
    >
      <Box
        style={{ elevation: 6 }}
        boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
        mt="xxxs"
        width={'100%'}
        minHeight={180}
        backgroundColor={'white'}
      >
        <Box
          minHeight={138}
          paddingY={'micro'}
          paddingX={'micro'}
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
              {stringToReal(String(order.value))}
            </Typography>
          </Box>
          <Typography
            fontSize={20}
            fontFamily="reservaSerifBold"
            color="vermelhoRSV"
          >
            {data.orderId}
          </Typography>
          {order.status === 'payment-pending' && (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                style={{ marginTop: 5, marginBottom: 5 }}
                mt={'micro'}
                fontSize={14}
                fontFamily="nunitoBold"
                color={
                  ['payment-pending', 'canceled'].includes(order.status)
                    ? 'vermelhoAlerta'
                    : 'verdeSucesso'
                }
              >
                Pagamento pendente
              </Typography>
              <Box flexDirection="row" alignItems="center">
                <Box marginRight="nano">
                  <Icon name="Clock" size={15} />
                </Box>
                <Typography>{getTime()}</Typography>
              </Box>
            </Box>
          )}
          {order.status === 'payment-approved' && (
            <Typography
              style={{ marginTop: 5, marginBottom: 5 }}
              mt={'micro'}
              fontSize={14}
              fontFamily="nunitoBold"
              color="verdeSucesso"
            >
              Pagamento aprovado!
            </Typography>
          )}
          <Typography fontSize={14} fontFamily="nunitoRegular" color="preto">
            Endereço de entrega:{' '}
            {` ${order.shippingData.address.street}, ${order.shippingData.address.number}, ${order.shippingData.address.neighborhood} - ${order.shippingData.address.city} - ${order.shippingData.address.state} - ${order.shippingData.address.postalCode}`}
          </Typography>
        </Box>
        <Divider variant="fullWidth" mt="micro" />
        <Box
          alignItems="center"
          pt={'micro'}
        >
          <Icon name="ArrowDown" size={20} />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Order;
