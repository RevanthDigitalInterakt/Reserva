import { useClipboard } from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import OrderDetailComponent from '../Components/OrderDetailComponent';
import { platformType } from '../../../utils/platformType';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { useInvoiceKeyLazyQuery, useTrackingCodeLazyQuery } from '../../../base/graphql/generated';
import { OrderDetail, type IVtexServiceRequestOrder } from '../../../services/vtexService';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import { PriceCustom } from '../../../modules/Checkout/components/PriceCustom';
import { COLORS } from '../../../base/styles';
import EventProvider from '../../../utils/EventProvider';

function OrderList({ route }: any): React.ReactElement {
  const { order } = route.params;
  const navigation = useNavigation();
  const [orderDetails, setOrderDetails] = useState<IVtexServiceRequestOrder>();
  const [, setCopiedText] = useClipboard();
  const [loading, setLoading] = useState(true);
  const [clickedIcon, setClickedIcon] = useState(false);
  const { profile } = useAuthStore(['profile']);

  const installmentValue = useMemo(() => {
    const value = (orderDetails?.value as number / 100);

    const [transaction] = orderDetails?.paymentData?.transactions || [];
    const [payment] = transaction?.payments || [];

    return value / (payment?.installments || 1);
  }, [orderDetails?.paymentData]);

  const [onVerifyInvoiceSLA, { data: invoiceData }] = useInvoiceKeyLazyQuery({
    context: { clientName: 'gateway' },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const [onVerifyTrackingSLA, { data: trackingData }] = useTrackingCodeLazyQuery({
    context: { clientName: 'gateway' },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const fetchOrderDetail = async () => {
    if (profile?.authCookie != null) {
      setLoading(true);
      const { data } = await OrderDetail(order.orderId);
      setOrderDetails(data);
      setLoading(false);
    }
  };

  const handleClick = useCallback((eventName: string, screenName: string, data?: string) => {
    EventProvider.logEvent(eventName, {});
    navigation.navigate(screenName, { data });
  }, []);

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  useEffect(() => {
    if (orderDetails) {
      const packages = orderDetails?.packageAttachment?.packages[0];
      if (packages?.trackingNumber && packages.trackingNumber.length <= 20) {
        onVerifyTrackingSLA({
          variables: {
            trackingCode: packages?.trackingNumber,
          },
        });
      } else if (packages?.invoiceKey) {
        onVerifyInvoiceSLA({
          variables: {
            invoiceKey: packages?.invoiceKey,
          },
        });
      }
    }
  }, [orderDetails]);

  const handleTrackingUrl = useCallback(async () => {
    if (trackingData?.trackingCode?.trackingUrl) {
      await Linking.openURL(trackingData?.trackingCode?.trackingUrl);
    }
  }, [trackingData?.trackingCode]);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton showShadow loading={loading} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {orderDetails?.status !== 'canceled' ? (
          <>
            {
              (orderDetails && orderDetails?.packageAttachment.packages.length > 0) ? (
                <Box
                  mb="xxxs"
                  justifyContent="flex-start"
                  paddingTop="md"
                >
                  <Typography variant="tituloSessoes">
                    Rastreamento de entrega
                  </Typography>
                </Box>
              ) : null
            }
            {orderDetails && (
              <Box
                marginY="micro"
                borderBottomWidth="hairline"
                borderBottomColor="divider"
              >
                {
                  invoiceData?.invoiceKey ? (
                    <>
                      <Typography
                        fontSize={14}
                        fontFamily="nunitoBold"
                        style={{ marginBottom: 5 }}
                      >
                        Previsão:
                        {' '}
                        {invoiceData?.invoiceKey.estimatedDeliveryDateFormated}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Último status:
                        {' '}
                        {invoiceData?.invoiceKey.providerMessage
                          ? invoiceData?.invoiceKey.providerMessage
                          : invoiceData?.invoiceKey.shipmentOrderVolumeState}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Em:
                        {' '}
                        {invoiceData?.invoiceKey.lastStatusCreated}
                      </Typography>
                    </>
                  ) : null
                }
                {
                  trackingData?.trackingCode ? (
                    <>
                      <Typography
                        fontSize={14}
                        fontFamily="nunitoBold"
                        style={{ marginBottom: 5 }}
                      >
                        Previsão:
                        {' '}
                        {trackingData?.trackingCode.estimatedDeliveryDateFormated}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Último status:
                        {' '}
                        {trackingData?.trackingCode.providerMessage
                          ? trackingData?.trackingCode.providerMessage
                          : trackingData?.trackingCode.shipmentOrderVolumeState}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Em:
                        {' '}
                        {trackingData?.trackingCode.lastStatusCreated}
                      </Typography>
                    </>
                  ) : null
                }
                {
                  !trackingData?.trackingCode
                    && !invoiceData?.invoiceKey
                    && order?.paymentApprovedDate ? (
                      <Typography fontSize={14} fontFamily="nunitoBold">
                        Previsão:
                        {' '}
                        {format(
                          new Date(
                            orderDetails?.shippingData?.logisticsInfo[0]?.shippingEstimateDate!,
                          ),
                          'dd/MM/yy',
                          { locale: ptBR },
                        )}
                      </Typography>
                    ) : null
                }
                <Box mt="nano">
                  <Typography
                    style={{ marginBottom: 5 }}
                    fontSize={14}
                    fontFamily="nunitoRegular"
                  >
                    {
                      orderDetails?.shippingData?.logisticsInfo[0]?.deliveryChannel === 'pickup-in-point'
                        ? 'Endereço de retirada'
                        : 'Endereço de entrega'
                    }
                    :
                    {` ${orderDetails.shippingData.address.street}, ${orderDetails.shippingData.address.number}, ${orderDetails.shippingData.address.neighborhood} - ${orderDetails.shippingData.address.city} - ${orderDetails.shippingData.address.state} - ${orderDetails.shippingData.address.postalCode}
                  `}
                  </Typography>
                </Box>
                {
                  (
                    orderDetails?.packageAttachment?.packages.length > 0
                    && orderDetails?.shippingData?.logisticsInfo[0]?.deliveryChannel !== 'pickup-in-point'
                  ) ? (
                    <>
                      <Box mb="micro" flexDirection="row">
                        {clickedIcon ? (
                          <Box
                            position="absolute"
                            right="30%"
                            bottom={30}
                            bg="white"
                            boxShadow={
                              Platform.OS === platformType.IOS ? 'topBarShadow' : null
                            }
                            style={{ elevation: 5 }}
                            width={107}
                            height={30}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="nano"
                          >
                            <Typography
                              fontFamily="nunitoRegular"
                              fontSize={13}
                            >
                              Código copiado!
                            </Typography>
                          </Box>
                        ) : null}
                        {
                          !invoiceData?.invoiceKey ? (
                            <>
                              <Typography fontFamily="nunitoRegular" fontSize={13}>
                                Código de rastreio:
                              </Typography>
                              <Box ml="quarck">
                                <TouchableOpacity onPress={handleTrackingUrl}>
                                  <Typography
                                    selectable
                                    fontFamily="nunitoExtraBold"
                                    fontSize={13}
                                    style={{ textDecorationLine: 'underline' }}

                                  >
                                    {
                                      orderDetails?.packageAttachment?.packages[0]?.trackingNumber
                                    }
                                  </Typography>
                                </TouchableOpacity>
                              </Box>
                            </>
                          ) : null
                        }
                      </Box>
                      {
                        orderDetails?.packageAttachment?.packages[0]?.trackingUrl ? (
                          <Box mb="xxs">
                            <Typography
                              fontFamily="nunitoRegular"
                              fontSize={13}
                              style={{ textDecorationLine: 'underline' }}
                              onPress={async () => {
                                const url = orderDetails?.packageAttachment?.packages[0];
                                if (url) {
                                  await Linking.openURL(url?.trackingUrl);
                                }
                              }}
                            >
                              Ver rastreio no site da transportadora
                            </Typography>
                          </Box>
                        ) : null
                      }
                    </>
                    ) : (
                      <Box mb="micro" flexDirection="row">
                        <Typography fontFamily="nunitoBold" fontSize={14}>
                          Ponto de Retirada:
                          {' '}
                          {
                            orderDetails?.shippingData?.logisticsInfo[0]
                              ?.pickupStoreInfo?.friendlyName
                          }
                        </Typography>
                      </Box>
                    )
                  }
              </Box>
            )}
          </>
        ) : null}

        <View>
          {orderDetails?.packageAttachment.packages[0]?.trackingUrl && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  const url = orderDetails?.packageAttachment?.packages[0];
                  handleClick('delivery_status', 'DeliveryStatusScreen', url?.trackingUrl);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.GRAY,
                  padding: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}
              >
                <Text>Acompanhar rastreio em detalhes</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {orderDetails && (
          <OrderDetailComponent data={orderDetails} deliveryState={3} />
        )}

        <Typography
          style={{ marginTop: 45 }}
          fontFamily="reservaSerifRegular"
          fontSize={20}
        >
          Forma de pagamento
        </Typography>

        {orderDetails && (
          <Box mt="xxs" flexDirection="row" justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              {orderDetails.paymentData.transactions[0].payments[0]
                .paymentSystem === 'Cartão de crédito' && (
                  <IconLegacy name="Card" size={20} mr="nano" />
              )}

              <Typography fontSize={12} fontFamily="nunitoRegular">
                {
                  orderDetails.paymentData.transactions[0].payments[0]
                    .paymentSystemName
                }
              </Typography>

              {orderDetails.paymentData.transactions[0].payments[0]
                .paymentSystem === 'Cartão de crédito' && (
                  <Typography
                    style={{ marginLeft: 10 }}
                    fontSize={12}
                    fontFamily="nunitoRegular"
                  >
                    {orderDetails.paymentData.transactions[0].payments[0].firstDigits}
                  </Typography>
              )}
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Typography fontSize={14} fontFamily="nunitoSemiBold">
                {
                  orderDetails.paymentData.transactions[0].payments[0]
                    .installments
                }
                x
                {' '}
              </Typography>
              <Typography fontSize={14} fontFamily="nunitoSemiBold">
                <PriceCustom
                  fontFamily="nunitoSemiBold"
                  sizeInterger={15}
                  sizeDecimal={11}
                  num={installmentValue}
                />
              </Typography>
            </Box>
          </Box>
        )}

        <View
          style={{
            marginVertical: 40,
          }}
        >
          {orderDetails?.packageAttachment.packages[0]?.invoiceKey && (
            <TouchableOpacity
              onPress={() => handleClick('exchange_return', 'ExchangeScreen')}
              style={{
                backgroundColor: COLORS.BLACK,
                alignItems: 'center',
                padding: 20,
                borderRadius: 50,
                marginBottom: 5,
              }}
            >
              <Text style={{ color: COLORS.WHITE }}>Solicitar troca ou devolução</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              handleClick('other_doubts', 'HelpCenter');
            }}
            style={{
              borderWidth: 1,
              borderColor: COLORS.BLACK,
              alignItems: 'center',
              padding: 20,
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.BLACK }}>Outras Dúvidas</Text>
          </TouchableOpacity>

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OrderList;
