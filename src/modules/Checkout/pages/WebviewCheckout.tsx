import React from 'react';
import { View, Alert } from 'react-native';
import { Box } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { WebView } from 'react-native-webview';
import { useCart } from '../../../context/CartContext';

const Checkout: React.FC<{}> = () => {
  const { orderForm } = useCart();
  const checkURL = (url: any) => {
    const check = url.includes('/checkout/orderPlaced');
    // verifica a url do webview se ja está no checkout/orderplaced para pegar o orderGroup da url.
    if (check) {
      Alert.alert(url);
    }
  };

  return (
    <View flex={1} backgroundColor={'white'}>
      <TopBarBackButton showShadow />
      <Box>
        {orderForm?.orderFormId !== '' && (
          <View style={{ width: '100%', height: 1000, backgroundColor: 'red' }}>
            <WebView
              onNavigationStateChange={(navState) => {
                checkURL(navState.url);
              }}
              source={{
                uri: `https://lojausereserva.vtexcommercestable.com.br/checkout/?orderFormId=${orderForm?.orderFormId}/&webview=true&app=applojausereserva&savecard=true&utm_source=app&utm_medium={medium}/#payment`,
              }}
            />
          </View>
        )}
      </Box>
    </View>
  );
};

export default Checkout;
