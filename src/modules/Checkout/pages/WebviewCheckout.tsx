import { Box, Button } from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Dimensions, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import * as StoreReview from 'react-native-store-review';
import { WebView } from 'react-native-webview';
import Config from 'react-native-config';
import { URL } from 'react-native-url-polyfill';
import { useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';
import ModalChristmasCoupon from '../../LandingPage/ModalChristmasCoupon';
import EventProvider from '../../../utils/EventProvider';

const Checkout: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm, orderform } = useCart();
  const [navState, setNavState] = useState('');
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');
  const [attemps, setAttemps] = useState(0);
  const [orderId, setOrderId] = useState('');

  const [showPromotionModal, setShowPromotionModal] = useState(false);

  const isOrderPlaced = useMemo(() => (
    navState.includes('/checkout/orderPlaced')
  ), [navState]);

  const webviewContainerHeight = useMemo(() => (
    Dimensions.get('window').height - (isOrderPlaced ? 200 : 100)
  ), [isOrderPlaced]);

  const removeAbandonedCartTags = useCallback(() => {
    OneSignal.sendTags({
      cart_update: '',
      product_name: '',
      product_image: '',
    });
  }, []);

  const getOrderId = useCallback(() => {
    const url = new URL(navState);
    const orderId = url.searchParams.get('og');

    return `${orderId}-01`;
  }, [navState]);

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

  useEffect(() => {
    if (isOrderPlaced) {
      const timestamp = Math.floor(Date.now() / 1000);
      OneSignal.sendTag('last_purchase_date', timestamp.toString());
      if (orderForm) {
        const orderValue = orderForm.value / 100;

        const revenue_total = orderForm.totalizers.find((item) => item.id === 'Items')?.value;
        let af_revenue = '0';

        if (revenue_total) {
          af_revenue = (revenue_total / 100).toFixed(2);
        }

        onHandlePromotionModal(orderValue);
        OneSignal.sendOutcomeWithValue('Purchase', (orderValue).toFixed(2));

        EventProvider.appsFlyer.logEvent('af_purchase', {
          af_revenue: `${af_revenue}`,
          af_price: `${orderValue.toFixed(2)}`,
          af_content_id: orderForm.items.map((item) => item.id),
          af_content_type: orderForm.items.map(
            (item) => item.productCategoryIds,
          ),
          af_currency: 'BRL',
          af_quantity: orderForm.items.map((item) => item.quantity),
          af_order_id: orderForm.orderFormId,
        });

        EventProvider.logPurchase({
          affiliation: 'APP',
          coupon: 'coupon',
          currency: 'BRL',
          items: orderForm.items.map((item) => ({
            price: item.price / 100,
            item_id: item.productId,
            quantity: item.quantity,
            item_name: item.name,
            item_variant: item.skuName,
            item_category: Object.values(item.productCategories).join('|'),
          })),
          shipping:
            (orderForm.totalizers.find((x) => x.name === 'Shipping')?.value
              || 0) / 100,
          tax:
            (orderForm?.paymentData?.payments[0]?.merchantSellerPayments[0]
              ?.interestRate || 0) / 100,
          transaction_id: '',
          value: orderValue,
        });
      }

      orderform();
      removeAbandonedCartTags();
      setCheckoutCompleted(true);
    }
  }, [isOrderPlaced]);

  useEffect(() => {
    if (navState.includes('checkout/orderPlaced')) {
      setUrl(navState);
      return;
    }

    setUrl(
      `${Config.URL_VTEX_CHECKOUT}/?orderFormId=${orderForm?.orderFormId}/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/payment`,
    );
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
          testID="checkout_button_back_to_home"
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
