import { Box, Button } from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Dimensions, Linking, Platform, View,
} from 'react-native';
import * as StoreReview from 'react-native-store-review';
import { WebView } from 'react-native-webview';
import Config from 'react-native-config';
import { URL } from 'react-native-url-polyfill';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';
import ModalChristmasCoupon from '../../LandingPage/ModalChristmasCoupon';
import EventProvider from '../../../utils/EventProvider';
import { adaptOrderFormItemsTrack } from '../../../utils/adaptOrderFormItemsTrack';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { useAuth } from '../../../context/AuthContext';
import { OrderForm, useCart } from '../../../context/CartContext';
import { GetPurchaseData } from '../../../services/vtexService';
import { urlRon } from '../../../utils/LinkingUtils/static/deepLinkMethods';
import { getAFContent, sumQuantity } from '../../../utils/checkoutInitiatedEvents';
import { getBrands } from '../../../utils/getBrands';
import { defaultBrand } from '../../../utils/defaultWBrand';

const FINAL_URL_TO_REDIRECT_CHECKOUT = 'https://lojausereservaqa.myvtex.com/' as const;
const URL_CHECKOUT_QA = 'https://lojausereservaqa.myvtex.com/checkout' as const;

const Checkout: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm, orderform } = useCart();
  const [navState, setNavState] = useState('');
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://lojausereservaqa.myvtex.com/_v/segment/admin-login/v1/login?returnUrl=%2F%3F');
  const [attemps, setAttemps] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [totalOrdersValue, setTotalOrdersValue] = useState<number>(0);

  const { getItem } = useAsyncStorageProvider();

  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const { cookie, email } = useAuth();

  useEffect(() => {
    EventProvider.getPushTags((receivedTags) => {
      if (receivedTags && receivedTags?.total_orders_value) {
        const result = parseFloat(receivedTags?.total_orders_value);
        if (result) setTotalOrdersValue(result);
      }
    });
  }, []);

  const isOrderPlaced = useMemo(() => (
    navState.includes('/checkout/orderPlaced')
  ), [navState]);

  const webviewContainerHeight = useMemo(() => (
    Dimensions.get('window').height - (isOrderPlaced ? 200 : 100)
  ), [isOrderPlaced]);

  const removeAbandonedCartTags = useCallback(() => {
    try {
      EventProvider.sendPushTags('sendAbandonedCartTags', {
        cart_update: '',
        product_name: '',
        product_image: '',
      });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, []);

  const getOrderId = useCallback(() => {
    const newUrl = new URL(navState);
    const newOrderId = newUrl.searchParams.get('og');

    return `${newOrderId}-01`;
  }, [navState]);

  useEffect(() => {
    async function execute() {
      if (email && cookie && orderForm) {
        try {
          const orderGroup = getOrderId()?.split('-')?.[0];
          const { data } = await GetPurchaseData(orderGroup, cookie);

          const { items } = orderForm;
          if (data && items?.length) {
            const newItems = items.map((item) => ({
              price: item?.price / 100 ?? 0,
              item_id: item?.productId,
              quantity: item?.quantity,
              item_name: item?.name,
              item_variant: item?.skuName,
              item_category: 'product',
            }));
            EventProvider.logEvent('add_payment_info', {
              coupon: '',
              currency: 'BRL',
              value: orderForm?.value / 100,
              payment_type: data[0]?.paymentData?.transactions[0]?.payments[0]?.paymentSystemName,
              items: newItems,
              wbrand: getBrands(items),
            });
          }
        } catch (e) {
          EventProvider.captureException(e);
        }
      }
    }
    if (isOrderPlaced) {
      execute();
    }
  }, [isOrderPlaced]);

  const onHandlePromotionModal = useCallback((orderPrice: number) => {
    if (orderPrice < 250 || showPromotionModal) return;

    const orderId = getOrderId();

    if (orderId) {
      setOrderId(orderId);
      setTimeout(() => setShowPromotionModal(true), 4000);
    }
  }, [isOrderPlaced, getOrderId, showPromotionModal]);

  const goToHome = () => {
    if (isOrderPlaced) {
      orderform();
      setTimeout(() => {
        navigation.navigate('Home');
      }, 500);
    }
  };

  const sendRonTracking = useCallback(async (orderValue: number) => {
    try {
      const [initialURL, isRon, ronItems] = await Promise.all([
        Linking.getInitialURL(),
        getItem('@RNSession:Ron'),
        getItem('@RNOrder:RonItems'),
      ]);

      if (!ronItems || !ronItems.length) return;

      const isRonSession = !!(urlRon(initialURL || '').match || isRon);
      if (!isRonSession) return;

      const productIds = (orderForm?.items || []).map((item) => item.productId);
      const hasAnyRonItem = ronItems.some((id) => productIds.includes(id));

      if (hasAnyRonItem) {
        EventProvider.logEvent(
          'ron_purchase',
          {
            coupon: 'coupon',
            currency: 'BRL',
            items: adaptOrderFormItemsTrack(orderForm?.items),
            transaction_id: '',
            value: orderValue,
            wbrand: getBrands(orderForm?.items || []),
          },
        );
      }
    } catch (err) {
      EventProvider.captureException(err);
    }
  }, [orderForm]);

  const trackEventOrderedDito = useCallback(async (orderData: OrderForm) => {
    try {
      const orderGroup = getOrderId()?.split('-')?.[0];
      const { data } = await GetPurchaseData(orderGroup, cookie);

      const payload = await getItem('@Dito:userRef');

      const itemQuantity = sumQuantity(orderData?.items);
      const itemSubtotal = (orderData.totalizers.find((x) => x.id === 'Items')?.value || 0) / 100;
      const itemShippingTotal = (orderData.totalizers.find((x) => x.name === 'Shipping')?.value || 0) / 100;
      const itemTotal = Number(itemSubtotal) + Number(itemShippingTotal);

      EventProvider.sendTrackEvent(
        'fez-pedido', {
          id: payload,
          action: 'fez-pedido',
          data: {
            quantidade_produtos: Number(itemQuantity),
            id_transacao: data[0]?.orderId || '',
            metodo_pagamento: data[0]?.paymentData?.transactions[0]?.payments[0]?.paymentSystemName || '',
            subtotal: Number(itemSubtotal),
            total: itemTotal,
            total_frete: itemShippingTotal,
            origem: 'app',
            dispositivo: Platform.OS,
            id: payload || '',
          },
        },
      );
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [getItem, getOrderId, cookie]);

  useEffect(() => {
    if (isOrderPlaced) {
      if (orderForm) {
        const orderValue = orderForm.value / 100;

        const timestamp = Math.floor(Date.now() / 1000);
        const newTotalOrdersValue = orderValue + totalOrdersValue;

        try {
          EventProvider.sendPushTags('sendLastOrderData', {
            last_order_value: orderValue.toString(),
            total_orders_value: newTotalOrdersValue.toString(),
            last_purchase_date: timestamp.toString(),
          });

          const revenueTotal = orderForm.totalizers.find((item) => item.id === 'Items')?.value;
          let af_revenue = '0';

          if (revenueTotal) {
            af_revenue = (revenueTotal / 100).toFixed(2);
          }

          onHandlePromotionModal(orderValue);
          EventProvider.OneSignal.sendOutcomeWithValue('Purchase', (orderValue).toFixed(2));

          EventProvider.appsFlyer.logEvent('af_purchase', {
            af_revenue: `${af_revenue}`,
            af_price: `${orderValue.toFixed(2)}`,
            af_content_id: orderForm?.items.map((item) => item.id),
            af_content_type: 'product',
            af_currency: 'BRL',
            af_quantity: sumQuantity(orderForm.items),
            af_order_id: orderForm?.orderFormId,
            af_content: getAFContent(orderForm.items),
            af_receipt_id: orderForm?.orderFormId,
          });

          sendRonTracking(orderValue);
          trackEventOrderedDito(orderForm);

          EventProvider.logEvent('page_view', {
            wbrand: defaultBrand.picapau,
          });

          EventProvider.logPurchase({
            affiliation: 'APP',
            coupon: 'coupon',
            currency: 'BRL',
            items: adaptOrderFormItemsTrack(orderForm?.items) || [],
            shipping:
              (orderForm.totalizers.find((x) => x.id === 'Shipping')?.value
                || 0) / 100,
            tax:
              (orderForm?.paymentData?.payments[0]?.merchantSellerPayments[0]
                ?.interestRate || 0) / 100,
            transaction_id: '',
            value: orderValue,
          });
        } catch (error) {
          EventProvider.captureException(error);
        }

        orderform();
        removeAbandonedCartTags();
        setCheckoutCompleted(true);
      }
    }
  }, [isOrderPlaced]);

  const handleNavState = useCallback(() => {
    if (navState.includes('checkout/orderPlaced')) {
      setUrl(navState);
      return;
    }

    setUrl(
      `${Config.URL_VTEX_CHECKOUT}/?orderFormId=${orderForm?.orderFormId}/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/payment`,
    );
  }, [navState]);

  const handleUpdateNavState = useCallback(async () => {
    const isTesting = await getItem('isTesting');
    if (isTesting) {
      if (navState === FINAL_URL_TO_REDIRECT_CHECKOUT) {
        setUrl(`${URL_CHECKOUT_QA}/?orderFormId=${orderForm?.orderFormId}/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/payment`);
      }
    } else {
      handleNavState();
    }
  }, [navState]);

  useEffect(() => {
    handleUpdateNavState();
  }, [navState]);

  useEffect(() => {
    if (attemps > 20) {
      setUrl(`https://www.usereserva.com/checkout/?orderFormId=${orderForm?.orderFormId}#/cart&sc=4`);
    }
  }, [attemps]);

  return (
    <View flex={1} backgroundColor="white">
      {loading && (
        <Box
          zIndex={5}
          height="100%"
          width="100%"
          backgroundColor="white"
          position="absolute"
          justifyContent="center"
          alignItems="center"
        >
          <LottieView source={loadingSpinner} style={{ width: 60 }} autoPlay loop />
        </Box>
      )}

      {checkoutCompleted ? (
        <TopBarCheckoutCompleted showShadow />
      ) : (
        <TopBarBackButton showShadow />
      )}

      <Box>
        {!!(orderForm?.orderFormId) && (
          <View
            style={{
              width: '100%',
              height: webviewContainerHeight,
              backgroundColor: '#ffffff',
            }}
          >
            <WebView
              testID="com.usereserva:id/web_view_checkout"
              onLoadStart={() => {
                setLoading(true);
              }}
              onLoadEnd={() => {
                setTimeout(() => setLoading(false), 1500);

                if (isOrderPlaced && StoreReview.isAvailable) {
                  setTimeout(() => StoreReview.requestReview(), 1600);
                }
              }}
              onNavigationStateChange={(navState) => {
                setNavState(navState.url);
                setAttemps((at) => at + 1);
              }}
              source={{
                uri: url,
              }}
            />
          </View>
        )}
      </Box>

      {isOrderPlaced && (
        <Button
          onPress={goToHome}
          title="VOLTAR PARA HOME"
          variant="primarioEstreito"
          inline
          testID="com.usereserva:id/checkout_button_back_to_home"
        />
      )}

      <ModalChristmasCoupon
        isVisible={showPromotionModal}
        orderId={orderId}
        onClose={() => setShowPromotionModal(false)}
      />
    </View>
  );
};

export default Checkout;
