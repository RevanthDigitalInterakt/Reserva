import { Box, Button } from '@danilomsou/reserva-ui';
import { loadingSpinner } from '@danilomsou/reserva-ui/src/assets/animations';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import OneSignal from 'react-native-onesignal';
import * as StoreReview from 'react-native-store-review';
import { WebView } from 'react-native-webview';
import { useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';

const Checkout: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm, orderform } = useCart();
  const [navState, setNavState] = useState('');
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const goToHome = () => {
    const check = navState.includes('/checkout/orderPlaced');

    if (check) {
      orderform();
      setTimeout(() => {
        navigation.navigate('Home');
      }, 500);
    }
  };

  const logStartEvent = async () => {
    if (orderForm) {
      const revenue_total = orderForm.totalizers.find(
        (item) => item.id === 'Items'
      )?.value;
      let af_revenue = '0';

      if (revenue_total) {
        af_revenue = (revenue_total / 100).toFixed(2);
      }

      await analytics().logEvent('start_purchase_webview', {
        revenue: `${af_revenue}`,
        price: `${(orderForm.value / 100).toFixed(2)}`,
        content_id: orderForm.items.map((item) => item.id),
        content_type: orderForm.items.map((item) => item.productCategoryIds),
        currency: 'BRL',
        quantity: orderForm.items.map((item) => item.quantity),
        order_id: orderForm.orderFormId,
      });

    }
  };

  useEffect(() => {
    const check = navState.includes('/checkout/orderPlaced');
    if (check) {
      if (orderForm) {
        const revenue_total = orderForm.totalizers.find(
          (item) => item.id === 'Items'
        )?.value;
        let af_revenue = '0';

        if (revenue_total) {
          af_revenue = (revenue_total / 100).toFixed(2);
        }

        OneSignal.sendOutcomeWithValue('Purchase', (orderForm.value / 100).toFixed(2));

        appsFlyer.logEvent('af_purchase', {
          af_revenue: `${af_revenue}`,
          af_price: `${(orderForm.value / 100).toFixed(2)}`,
          af_content_id: orderForm.items.map((item) => item.id),
          af_content_type: orderForm.items.map(
            (item) => item.productCategoryIds
          ),
          af_currency: 'BRL',
          af_quantity: orderForm.items.map((item) => item.quantity),
          af_order_id: orderForm.orderFormId,
          // af_receipt_id: orderForm.paymentData,
        });



        analytics().logPurchase({
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
            (orderForm.totalizers.find((x) => x.name === 'Shipping')?.value ||
              0) / 100,
          tax:
            (orderForm?.paymentData?.payments[0]?.merchantSellerPayments[0]
              ?.interestRate || 0) / 100,
          transaction_id: '',
          value: orderForm.value / 100,
        });
      }
      orderform();
      setCheckoutCompleted(true);
    }
  }, [navState]);

  return (
    <View flex={1} backgroundColor={'white'}>
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
          <LottieView
            source={loadingSpinner}
            style={{
              width: 60,
            }}
            autoPlay
            loop
          />
        </Box>
      )}
      {checkoutCompleted ? (
        <TopBarCheckoutCompleted showShadow />
      ) : (
        <TopBarBackButton showShadow />
      )}
      <Box>
        {orderForm?.orderFormId !== '' && (
          <View
            style={{
              width: '100%',
              height:
                Dimensions.get('window').height -
                (navState.includes('/checkout/orderPlaced') ? 200 : 100),
              backgroundColor: 'red',
            }}
          >
            <WebView
              onLoadStart={() => {
                setLoading(true);
              }}
              onLoadEnd={() => {
                setTimeout(() => setLoading(false), 1500);
                if (navState.includes('/checkout/orderPlaced')) {
                  if (StoreReview.isAvailable) {
                    setTimeout(() => StoreReview.requestReview(), 1600);
                  }
                }
              }}
              onNavigationStateChange={(navState) => {
                setNavState(navState.url);
              }}
              source={{
                uri: `https://applojausereserva.vtexcommercestable.com.br/checkout/?orderFormId=${orderForm?.orderFormId}/&webview=true&app=applojausereserva&savecard=true&utm_source=app/#payment`,
              }}
            />
          </View>
        )}
      </Box>

      {navState.includes('/checkout/orderPlaced') && (
        <Button
          onPress={goToHome}
          title="VOLTAR PARA HOME"
          variant="primarioEstreito"
          inline
        />
      )}
    </View>
  );
};

export default Checkout;
