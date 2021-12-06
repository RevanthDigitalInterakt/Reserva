import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Box, Button } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { WebView } from 'react-native-webview';
import { useCart } from '../../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'
import { loadingSpinner } from 'reserva-ui/src/assets/animations';
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';
import * as StoreReview from 'react-native-store-review';

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
      orderform();
      setCheckoutCompleted(true)
    }
  }, [navState])

  return (
    <View flex={1} backgroundColor={'white'}>
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
                    setTimeout(() => StoreReview.requestReview(), 1500)
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
