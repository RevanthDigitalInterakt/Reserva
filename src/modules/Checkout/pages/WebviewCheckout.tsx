import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Box, Button } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { WebView } from 'react-native-webview';
import { useCart } from '../../../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const Checkout: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm, orderform } = useCart();
  const [navState, setNavState] = useState('');

  const goToHome = () => {
    const check = navState.includes('/checkout/orderPlaced');

    if (check) {
      orderform();

      setTimeout(() => {
        navigation.navigate('Home');
      }, 500);
    }
  };

  return (
    <View flex={1} backgroundColor={'white'}>
      <TopBarBackButton showShadow />

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
              onNavigationStateChange={(navState) => {
                setNavState(navState.url);
              }}
              source={{
                uri: `https://app-vtex.usereserva.com/checkout/?orderFormId=${orderForm?.orderFormId}/&webview=true&app=applojausereserva&savecard=true&utm_source=app/#payment`,
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
