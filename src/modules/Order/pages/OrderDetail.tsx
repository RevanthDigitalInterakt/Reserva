import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Linking, Platform } from 'react-native';
import { useClipboard } from '@react-native-clipboard/clipboard';

import {
  Typography,
  Box,
  Button,
  Alert,
  Icon,
  Stepper,
  Image,
} from 'reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import { PackageAttachment, IOrderId, useCart } from '../../../context/CartContext';
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
  const { cookie } = useAuth();
  const { tracking, orderDetail } = useCart();
  const [orderDetails, setOrderDetails] = useState<IOrderId>();
  const [trackingDescription, setTrackingDescription] = useState<PackageAttachment>();
  const [copiedText, setCopiedText] = useClipboard();
  const [clickedIcon, setClickedIcon] = useState(false);

  // const deliveryTracking = async () => {
  //   if (cookie != null) {
  //     console.log('cookie', cookie)
  //     const data = await tracking(cookie, order.orderId);
  //     setTrackingDescription(data)
  //     console.log('cookieData', data?.packageAttachment)
  //   }
  // }

  useEffect(() => {
    console.log('order', order)
    fetchOrderDetail();
  }, []);

  const fetchOrderDetail = async () => {
    if (cookie != null) {
      const data = await orderDetail(order.orderId);
      setOrderDetails(data);
      console.log('fetchOrderDetail', data);
    }
  }

  useEffect(() => {
    console.log('orderDetails', orderDetails);
  }, [orderDetails]);

  // useEffect(() => {
  //   deliveryTracking()
  // }, []);

  // useEffect(() => {
  //   console.log('trackingDescription', trackingDescription?.packageAttachment.packages[0]?.trackingUrl)
  // }, [trackingDescription]);

  useEffect(() => {
    console.log('copiedTextsss', copiedText)
  }, [copiedText]);


  const getDeliveryPreview = () => {
    if (orderDetails) {
      const { shippingData } = orderDetails;
      const { selectedSla, slas } = shippingData.logisticsInfo[0];
      const sla = slas.find(({ name }: any) => name === selectedSla);
      if (sla) {
        const { shippingEstimate } = sla;
        const businessDaysAmount = shippingEstimate.match(/\d+/g)[0];
        const estimatedDeliveryDay = new Date();
        estimatedDeliveryDay.setDate(
          estimatedDeliveryDay.getDate() + +businessDaysAmount
        );

        if (estimatedDeliveryDay.getDay() === 0) {
          estimatedDeliveryDay.setDate(estimatedDeliveryDay.getDate() + 3);
        }

        if (estimatedDeliveryDay.getDay() === 7) {
          estimatedDeliveryDay.setDate(estimatedDeliveryDay.getDate() + 5);
        }
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
  }
  const handleCopiedText = () => {
    setClickedIcon(true)
    if (orderDetails) {
      setCopiedText(orderDetails?.packageAttachment?.packages[0].trackingNumber)
    }
    setTimeout(() => setClickedIcon(false), 1000);
  }

  return (
    <>
      <SafeAreaView flex={1} backgroundColor={'white'}>
        <TopBarBackButton showShadow />
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {orderDetails?.status !== 'canceled' && (
            <>
              {orderDetails &&
                orderDetails?.packageAttachment.packages.length > 0 &&
                <>

                  <Box mb="xxxs" justifyContent="flex-start" paddingTop={'md'}>
                    <Typography variant={'tituloSessoes'}>
                      Rastreamento de entrega
                    </Typography>
                  </Box>
                  {orderDetails &&
                    orderDetails?.packageAttachment?.packages[0].courierStatus != null &&
                    orderDetails?.packageAttachment?.packages[0].courierStatus.data.length > 0 &&
                    <Box paddingX="xxs" paddingY="xs">
                      <Stepper
                        steps={['Pedido Entregue a Transportadora', 'Confirmação', 'Envio', 'Entrega']}
                        actualStepIndex={2}
                      />
                    </Box>
                  }
                </>
              }
              <Box
                marginY="micro"
                borderBottomWidth={'hairline'}
                borderBottomColor={'divider'}
              >
                <Typography fontSize={14} fontFamily="nunitoBold">
                  Previsão: {getDeliveryPreview()}
                </Typography>
                <Box mt="nano">
                  <Typography
                    style={{ marginBottom: 5 }}
                    fontSize={14}
                    fontFamily="nunitoRegular"
                  >
                    Endereço de entrega:
                    {orderDetails &&
                      ` ${orderDetails.shippingData.address.street}, ${orderDetails.shippingData.address.number}, ${orderDetails.shippingData.address.neighborhood} - ${orderDetails.shippingData.address.city} - ${orderDetails.shippingData.address.state} - ${orderDetails.shippingData.address.postalCode}
                  `}
                  </Typography>
                </Box>

                {orderDetails &&
                  orderDetails?.packageAttachment?.packages.length > 0 &&
                  <>

                    <Box flexDirection="row">
                      {clickedIcon &&
                        <Box
                          position="absolute"
                          right={"30%"}
                          bottom={30}
                          bg="white"
                          boxShadow={Platform.OS === "ios" ? "topBarShadow" : null}
                          style={{ elevation: 5 }}
                          width={107}
                          height={30}
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="nano"
                        >
                          <Typography
                            fontFamily="nunitoRegular"
                            fontSize={13}>
                            Código copiado!
                          </Typography>
                        </Box>
                      }
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize={13}
                      >
                        Código de rastreio:

                      </Typography>
                      <Box ml="quarck">
                        <Typography
                          selectable={true}
                          fontFamily="nunitoExtraBold"
                          fontSize={13}
                        >
                          {orderDetails?.packageAttachment?.packages[0].trackingNumber}
                        </Typography>
                      </Box>
                      <Button ml="xxxs" onPress={() => handleCopiedText()}>
                        <Icon name="Copy" size={20} color="neutroFrio2" />
                      </Button>
                    </Box>

                    <Box mt="micro" mb="xxs">
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize={13}
                        style={{ textDecorationLine: 'underline' }}
                        onPress={() => Linking.openURL(orderDetails?.packageAttachment?.packages[0]?.trackingUrl)}
                      >
                        Ver rastreio no site da transportadora
                      </Typography>

                    </Box>
                  </>
                }
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
              {/* {order.paymentData.transactions[0].payments[0].paymentSystem ===
                'Cartão de crédito' && <Icon name="Card" size={20} mr="nano" />} */}

              {/* <Typography fontSize={12} fontFamily="nunitoRegular">
                {
                  order.paymentData.transactions[0].payments[0]
                    .paymentSystemName
                }
              </Typography> */}
              {/* {order.paymentData.transactions[0].payments[0].paymentSystem ===
                'Cartão de crédito' && (
                  <Typography
                    style={{ marginLeft: 10 }}
                    fontSize={12}
                    fontFamily="nunitoRegular"
                  >
                    {order.paymentData.transactions[0].payments[0].firstDigits}
                  </Typography>
                )} */}
            </Box>
            <Box flexDirection="row" alignItems="center">
              {/* <Typography fontSize={14} fontFamily="nunitoSemiBold">
                {order.paymentData.transactions[0].payments[0].installments}x{' '}
              </Typography>
              <Typography fontSize={14} fontFamily="nunitoSemiBold">
                R$ {order.paymentData.transactions[0].payments[0].value / 100}
              </Typography> */}
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
