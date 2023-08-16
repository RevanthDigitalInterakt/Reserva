import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Dimensions, Linking, Platform, View,
} from 'react-native';
import Config from 'react-native-config';
import * as StoreReview from 'react-native-store-review';
import { URL } from 'react-native-url-polyfill';
import { WebView } from 'react-native-webview';
import { loadingSpinner } from '../../../../assets/animations';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { useCart, type OrderForm } from '../../../context/CartContext';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { GetPurchaseData } from '../../../services/vtexService';
import EventProvider from '../../../utils/EventProvider';
import { urlRon } from '../../../utils/LinkingUtils/static/deepLinkMethods';
import { adaptOrderFormItemsTrack } from '../../../utils/adaptOrderFormItemsTrack';
import { getAFContent, sumQuantity } from '../../../utils/checkoutInitiatedEvents';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { getBrands } from '../../../utils/getBrands';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';

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
  const [totalOrdersValue, setTotalOrdersValue] = useState<number>(0);

  const { getItem } = useAsyncStorageProvider();

  const { profile } = useAuthStore(['profile']);

  useEffect(() => {
    EventProvider.logEvent('payment_step', {});
  }, []);

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
      if (orderForm) {
        try {
          const userDocument = await getItem('@Dito:userRef');
          const orderGroup = getOrderId()?.split('-')?.[0];
          const response = await GetPurchaseData(orderGroup);

          const { items } = orderForm;
          if (response?.data && items?.length) {
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
              payment_type: response?.data[0]?.paymentData
                ?.transactions[0]?.payments[0]?.paymentSystemName,
              items: newItems,
              wbrand: getBrands(items),
            });
          }

          items.forEach((item) => {
            EventProvider.sendTrackEvent('fez-pedido-produto', {
              id: userDocument || '',
              action: 'fez-pedido-produto',
              data: {
                id: userDocument || '',
                id_transacao: response?.data[0]?.orderId || '',
                quantidade: item?.quantity,
                marca: getBrands(items),
                id_produto: item?.productId,
                nome_produto: item?.name,
                nome_categoria: item?.productCategories,
                tamanho: item?.skuName.split('-')?.[1]?.trim(),
                cor: item?.skuName.split('-')?.[0]?.trim(),
                preco_produto: item?.priceDefinition?.calculatedSellingPrice / 100 ?? 0,
                origem: 'app',
              },
            });
          });
        } catch (e) {
          EventProvider.captureException(e);
        }
      }
    }
    if (isOrderPlaced) execute();
  }, [isOrderPlaced]);

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
      const response = await GetPurchaseData(orderGroup);

      const payload = await getItem('@Dito:userRef');

      const itemQuantity = sumQuantity(orderData?.items);
      const itemSubtotal = (orderData.totalizers.find((x) => x.id === 'Items')?.value || 0) / 100;
      const itemShippingTotal = (orderData.totalizers.find((x) => x.name === 'Shipping')?.value || 0) / 100;
      const itemTotal = Number(itemSubtotal) + Number(itemShippingTotal);

      EventProvider.sendTrackEvent('fez-pedido', {
        id: payload,
        action: 'fez-pedido',
        data: {
          quantidade_produtos: Number(itemQuantity),
          id_transacao: response?.data[0]?.orderId || '',
          metodo_pagamento: response?.data[0]?.paymentData?.transactions[0]?.payments[0]?.paymentSystemName || '',
          subtotal: Number(itemSubtotal),
          total: itemTotal,
          total_frete: itemShippingTotal,
          origem: 'app',
          dispositivo: Platform.OS,
          id: payload || '',
        },
      });

      EventProvider.logPurchase({
        affiliation: 'APP',
        coupon: 'coupon',
        currency: 'BRL',
        items: adaptOrderFormItemsTrack(orderForm?.items) || [],
        shipping:
          (orderForm?.totalizers.find((x) => x.id === 'Shipping')?.value
            || 0) / 100,
        tax:
          (orderForm?.paymentData?.payments[0]?.merchantSellerPayments[0]
            ?.interestRate || 0) / 100,
        transaction_id: response?.data[0]?.orderId || '',
        value: itemTotal,
      });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [
    getItem,
    getOrderId,
    orderForm?.items,
    orderForm?.paymentData?.payments,
    orderForm?.totalizers,
  ]);

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
          let afRevenue = '0';

          if (revenueTotal) {
            afRevenue = (revenueTotal / 100).toFixed(2);
          }

          EventProvider.OneSignal.sendOutcomeWithValue('Purchase', (orderValue).toFixed(2));

          EventProvider.appsFlyer.logEvent('af_purchase', {
            af_revenue: `${afRevenue}`,
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

          EventProvider.logEvent('add_payment_info_test', {});
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

      {(isOrderPlaced && checkoutCompleted) && (
        <Button
          onPress={goToHome}
          title="VOLTAR PARA HOME"
          variant="primarioEstreito"
          inline
          testID="com.usereserva:id/checkout_button_back_to_home"
        />
      )}
    </View>
  );
};

export default Checkout;
