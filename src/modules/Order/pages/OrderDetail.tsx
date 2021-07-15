import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import {
  Typography,
  Box,
  Button,
  Alert,
  Icon,
  Stepper,
  Image,
} from 'reserva-ui';
import { orderQuery } from '../../../graphql/orders/ordersQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Order from '../Components/Order';
import OrderDetailComponent, {
  IOrderData,
} from '../Components/OrderDetailComponent';

type Props = StackScreenProps<RootStackParamList, 'OrderDetail'>;

const OrderList: React.FC<any> = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();

  const getDeliveryPreview = () => {
    const { shippingData } = order;
    const { selectedSla, slas } = shippingData.logisticsInfo[0];
    const sla = slas.find(({ name }: any) => name === selectedSla);

    if (sla) {
      const { shippingEstimate } = sla;
      const businessDaysAmount = shippingEstimate.match(/\d+/g)[0];
      const estimatedDeliveryDay = new Date();
      estimatedDeliveryDay.setDate(
        estimatedDeliveryDay.getDate() + +businessDaysAmount
      );

      // cant do this right now, too much logic

      // if (estimatedDeliveryDay.getDay() === 0) {
      //   console.log('AQUI');
      //   estimatedDeliveryDay.setDate(estimatedDeliveryDay.getDate() + 3);
      // }

      // if (estimatedDeliveryDay.getDay() === 7) {
      //   estimatedDeliveryDay.setDate(estimatedDeliveryDay.getDate() + 5);
      // }

      const day =
        estimatedDeliveryDay.getDate() < 10
          ? `0${estimatedDeliveryDay.getDate()}`
          : estimatedDeliveryDay.getDate();

      const month =
        estimatedDeliveryDay.getMonth() + 1 < 10
          ? `0${estimatedDeliveryDay.getMonth() + 1}`
          : estimatedDeliveryDay.getMonth() + 1;

      return `${day}/${month}/${estimatedDeliveryDay.getFullYear()}`;
    }
  };

  return (
    <>
      <SafeAreaView flex={1} backgroundColor={'white'}>
        <TopBarBackButton showShadow />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {order.status !== 'canceled' && (
            <>
              <Box mb="xxxs" justifyContent="flex-start" paddingTop={'md'}>
                <Typography variant={'tituloSessoes'}>
                  Rastreamento de entrega
                </Typography>
              </Box>
              {/* <Box paddingX="xxs" paddingY="xs">
                <Stepper
                  steps={['Pedido feito', 'Confirmação', 'Envio', 'Entrega']}
                  actualStepIndex={2}
                />
              </Box> */}

              <Box
                marginY="micro"
                borderBottomWidth={'hairline'}
                borderBottomColor={'divider'}
              >
                <Typography fontSize={14} fontFamily="nunitoBold">
                  {getDeliveryPreview()}
                </Typography>
                <Typography
                  style={{ marginBottom: 17 }}
                  fontSize={14}
                  fontFamily="nunitoRegular"
                >
                  Endereço de entrega:
                  {order.shippingData &&
                    `${order.shippingData.address.street}, ${order.shippingData.address.number}, ${order.shippingData.address.neighborhood} - ${order.shippingData.address.city} - ${order.shippingData.address.state} - ${order.shippingData.address.postalCode}
                  `}
                </Typography>
              </Box>
            </>
          )}

          <OrderDetailComponent data={order} deliveryState={3} />

          <Typography
            style={{ marginTop: 45 }}
            fontFamily="reservaSerifRegular"
            fontSize={20}
          >
            Forma de pagamento
          </Typography>

          <Box mt={'xxs'} flexDirection="row" justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              {order.paymentData.transactions[0].payments[0].paymentSystem ===
                'Cartão de crédito' && <Icon name="Card" size={20} mr="nano" />}

              <Typography fontSize={12} fontFamily="nunitoRegular">
                {
                  order.paymentData.transactions[0].payments[0]
                    .paymentSystemName
                }
              </Typography>
              {order.paymentData.transactions[0].payments[0].paymentSystem ===
                'Cartão de crédito' && (
                <Typography
                  style={{ marginLeft: 10 }}
                  fontSize={12}
                  fontFamily="nunitoRegular"
                >
                  {order.paymentData.transactions[0].payments[0].firstDigits}
                </Typography>
              )}
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Typography fontSize={14} fontFamily="nunitoSemiBold">
                {order.paymentData.transactions[0].payments[0].installments}x{' '}
              </Typography>
              <Typography fontSize={14} fontFamily="nunitoSemiBold">
                R$ {order.paymentData.transactions[0].payments[0].value / 100}
              </Typography>
            </Box>
          </Box>

          <Box mb={'md'} mt="md">
            <Box width="100%">
              <Button
                inline
                title="PRECISO DE AJUDA"
                variant="primarioEstreitoOutline"
                onPress={() => {
                  navigation.navigate('HelpCenter');
                }}
              />
            </Box>
            <Box my="xxxs">
              <Button
                inline
                onPress={() => {
                  navigation.navigate('OrderCancel');
                }}
                title="Desejo cancelar meu pedido"
              >
                <Typography
                  style={{ textDecorationLine: 'underline' }}
                  fontSize="12px"
                  fontFamily="nunitoRegular"
                >
                  Desejo cancelar meu pedido
                </Typography>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
