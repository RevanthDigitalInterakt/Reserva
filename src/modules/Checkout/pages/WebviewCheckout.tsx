import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, View, Button as TestButton } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import * as StoreReview from 'react-native-store-review';
import { WebView } from 'react-native-webview';
import { Box, Button } from 'reserva-ui';
import { loadingSpinner } from 'reserva-ui/src/assets/animations';
import { useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';
import { checkoutService } from '../../../services/checkoutService'
const Checkout: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm, orderform } = useCart();
  const [navState, setNavState] = useState('');
  const [checkoutCompleted, setCheckoutCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  const goToHome = () => {
    const check = navState.includes('/checkout/orderPlaced');

    if (check) {
      orderform();
      setTimeout(() => {
        navigation.navigate('Home');
      }, 500);
    }
  };

  useEffect(() => {
    const check = navState.includes('/checkout/orderPlaced');
    if (check) {
      if (orderForm) {
        appsFlyer.logEvent('af_purchase', {
          af_revenue: `${orderForm.totalizers.find(item => item.id === 'Items')?.value.toFixed(2)}`,
          af_price: `${(orderForm.value / 100).toFixed(2)}`,
          af_content_id: orderForm.items.map(item => item.id),
          af_content_type: orderForm.items.map(item => item.productCategoryIds),
          af_currency: 'BRL',
          af_quantity: orderForm.items.map(item => item.quantity),
          af_order_id: orderForm.orderFormId,
          // af_receipt_id: orderForm.paymentData,
        })
      }
      orderform();
      setCheckoutCompleted(true)
    }
  }, [navState])

  const [getWayData, setGetWayData] = useState({
    transactionId: '',
    orderGroup: '',
  })


  return (
    <View flex={1} backgroundColor={'white'}>
      <TestButton
        color={'green'}
        onPress={() => {
          if (!!orderForm) {
            checkoutService.setPixAsPaymentMethod({
              orderFormId: orderForm.orderFormId,
              value: orderForm.value,
            })
          }
        }}
        title="set pix as payment method"
      />
      <TestButton
        onPress={async () => {
          if (!!orderForm) {
            const { data }: any = await checkoutService.transaction({
              orderFormId: orderForm.orderFormId,
              interestValue: 0,
              value: orderForm.value,
              savePersonalData: true,
              optinNewsLetter: false
            })
            if (!!data.id && !!data.orderGroup) {
              setGetWayData({
                transactionId: data.id,
                orderGroup: data.orderGroup
              })
            }
          }
        }}
        title="Transaction"
      />
      <TestButton
        color={'purple'}
        onPress={() => {
          if (!!orderForm) {
            checkoutService.paymentGetway({
              transactionId: getWayData.transactionId,
              orderGroup: getWayData.orderGroup,
              value: orderForm.value,
            })
          }
        }}
        title="payment getway"
      />
      <TestButton
        color={'darkred'}
        onPress={async () => {
          if (!!orderForm) {
            const code = await checkoutService.callBack({
              orderGroup: getWayData.orderGroup,
            })
            console.log('codigo pix', code)
          }
        }}
        title="payment callback"
      />
      {loading && <Box zIndex={5} height='100%' width='100%' backgroundColor='white' position='absolute' justifyContent='center' alignItems='center'>
        <LottieView
          source={loadingSpinner}
          style={{
            width: 60,
          }}
          autoPlay
          loop
        />
      </Box>}
      {checkoutCompleted ?
        <TopBarCheckoutCompleted showShadow />
        :
        <TopBarBackButton showShadow />
      }
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
                setLoading(true)
              }}

              onLoadEnd={() => {
                setTimeout(() => setLoading(false),
                  1500)
                if (navState.includes('/checkout/orderPlaced')) {
                  if (StoreReview.isAvailable) {
                    setTimeout(() => StoreReview.requestReview(), 1600)
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
