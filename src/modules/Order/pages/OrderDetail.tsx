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
  TouchableOpacity,
} from 'react-native';

import {
  fetchTrackingStatusByInvoiceKey,
  fetchTrackingStatusByTrackingNumber,
} from '../../../services/intelipostService';
import type { TrackingNumberData, InvoiceKeyData } from '../../../services/intelipostService';
import { type IOrderId, useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import OrderDetailComponent from '../Components/OrderDetailComponent';
import { platformType } from '../../../utils/platformType';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Stepper } from '../../../components/Stepper/Stepper';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';

function OrderList({ route }: any): React.ReactElement {
  const { order } = route.params;
  const navigation = useNavigation();
  const { orderDetail } = useCart();
  const [orderDetails, setOrderDetails] = useState<IOrderId>();
  const [orderTrackingStatus, setOrderTrackingStatus] = useState<{
    invoiceData: InvoiceKeyData | null,
    trackingData: TrackingNumberData | null
  }>({
    trackingData: null,
    invoiceData: null,
  });
  const [, setCopiedText] = useClipboard();
  const [loading, setLoading] = useState(true);
  const [clickedIcon, setClickedIcon] = useState(false);
  const { profile } = useAuthStore(['profile']);

  const fetchOrderDetail = async () => {
    if (profile?.authCookie != null) {
      setLoading(true);
      const data = await orderDetail(order.orderId);
      setOrderDetails(data);
      setLoading(false);
    }
  };

  const fetchTrackingInvoiceStatus = async () => {
    const packages = orderDetails?.packageAttachment?.packages[0];
    const response = await fetchTrackingStatusByInvoiceKey(
      packages?.invoiceKey.toString() || '',
    );
    if (response.status === 200) {
      setOrderTrackingStatus({
        invoiceData: response.data,
        trackingData: null,
      });
    }
  };

  const fetchTrackingStatus = async () => {
    const packages = orderDetails?.packageAttachment?.packages[0];
    const response = await fetchTrackingStatusByTrackingNumber(
      packages?.trackingNumber.toString() || '',
    );
    if (response.status === 200) {
      setOrderTrackingStatus({
        trackingData: response.data,
        invoiceData: null,
      });
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  useEffect(() => {
    if (orderDetails) {
      const packages = orderDetails?.packageAttachment?.packages[0];
      if (packages?.trackingNumber) {
        fetchTrackingStatus();
      } else if (packages?.invoiceKey) {
        fetchTrackingInvoiceStatus();
      }
    }
  }, [orderDetails]);

  const handleCopiedText = () => {
    setClickedIcon(true);
    const packages = orderDetails?.packageAttachment?.packages[0];
    if (orderDetails) {
      setCopiedText(packages?.trackingNumber || '');
    }
    setTimeout(() => setClickedIcon(false), 1000);
  };

  const handleTrackingUrl = useCallback(async () => {
    await Linking.openURL(orderTrackingStatus.trackingData?.tracking_url!);
  }, [orderTrackingStatus]);

  const hasPackage = useMemo(() => {
    const pack = orderDetails?.packageAttachment?.packages[0]?.courierStatus;
    if (pack?.data?.length) {
      return true;
    }
    return false;
  }, [orderDetails?.packageAttachment?.packages]);

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
                <>
                  <Box
                    mb="xxxs"
                    justifyContent="flex-start"
                    paddingTop="md"
                  >
                    <Typography variant="tituloSessoes">
                      Rastreamento de entrega
                    </Typography>
                  </Box>
                  {
                    hasPackage ? (
                      <Box paddingX="xxs" paddingY="xs">
                        <Stepper
                          steps={[
                            'Pedido Entregue a Transportadora',
                            'Confirmação',
                            'Envio',
                            'Entrega',
                          ]}
                          actualStepIndex={2}
                        />
                      </Box>
                    ) : null
                  }
                </>
              ) : null
            }
            {orderDetails && (
              <Box
                marginY="micro"
                borderBottomWidth="hairline"
                borderBottomColor="divider"
              >
                {
                  orderTrackingStatus.trackingData ? (
                    <>
                      <Typography
                        fontSize={14}
                        fontFamily="nunitoBold"
                        style={{ marginBottom: 5 }}
                      >
                        Previsão:
                        {' '}
                        {orderTrackingStatus.trackingData.estimated_delivery_date_formated}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Último status:
                        {' '}
                        {orderTrackingStatus.trackingData.provider_message
                          ? orderTrackingStatus.trackingData.provider_message
                          : orderTrackingStatus.trackingData.shipment_order_volume_state}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Em:
                        {' '}
                        {orderTrackingStatus.trackingData.last_status_created}
                      </Typography>
                    </>
                  ) : orderTrackingStatus.invoiceData ? (
                    <>
                      <Typography
                        fontSize={14}
                        fontFamily="nunitoBold"
                        style={{ marginBottom: 5 }}
                      >
                        Previsão:
                        {' '}
                        {orderTrackingStatus.invoiceData.estimated_delivery_date_formated}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Último status:
                        {' '}
                        {orderTrackingStatus.invoiceData.provider_message
                          ? orderTrackingStatus.invoiceData.provider_message
                          : orderTrackingStatus.invoiceData.shipment_order_volume_state}
                      </Typography>
                      <Typography fontSize={14} fontFamily="nunitoRegular">
                        Em:
                        {' '}
                        {orderTrackingStatus.invoiceData.last_status_created}
                      </Typography>
                    </>
                  ) : order?.paymentApprovedDate ? (
                    <Typography fontSize={14} fontFamily="nunitoBold">
                      Previsão:
                      {' '}
                      {format(
                        new Date(orderDetails?.shippingData?.logisticsInfo[0]?.shippingEstimateDate!),
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
                        <Button ml="xxxs" onPress={handleCopiedText}>
                          <IconLegacy name="Copy" size={20} color="neutroFrio2" />
                        </Button>
                      </Box>
                      {
                        orderDetails?.packageAttachment?.packages[0]?.trackingUrl ? (
                          <Box mb="xxs">
                            <Typography
                              fontFamily="nunitoRegular"
                              fontSize={13}
                              style={{ textDecorationLine: 'underline' }}
                              onPress={async () => {
                                const url = orderDetails?.packageAttachment?.packages[0]?.trackingUrl;
                                if (url) {
                                  await Linking.openURL(url);
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
                          {orderDetails?.shippingData?.logisticsInfo[0]?.pickupStoreInfo?.friendlyName}
                        </Typography>
                      </Box>
                    )
                }
              </Box>
            )}
          </>
        ) : null}

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
                R$
                {' '}
                {orderDetails.paymentData.transactions[0].payments[0].value
                  / 100}
              </Typography>
            </Box>
          </Box>
        )}
        <Box mb="md" mt="md">
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
  );
}

export default OrderList;
