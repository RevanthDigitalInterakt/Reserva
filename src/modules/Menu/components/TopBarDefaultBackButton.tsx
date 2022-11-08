import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert, Platform } from 'react-native';
import { TopBar } from '@danilomsou/reserva-ui';

import { useCart } from '../../../context/CartContext';

export const TopBarDefaultBackButton: React.FC<{
  loading: Boolean;
  showShadow?: Boolean;
  navigateGoBack?: Boolean;
  backButtonPress?: () => void;
}> = ({ showShadow = true, loading = false, navigateGoBack = false, backButtonPress }) => {
  const navigation = useNavigation();
  const { orderForm } = useCart();
  const [bagQuantity, setBagQuantity] = useState(0);
  useEffect(() => {
    if (orderForm?.items) {
      const quantity = orderForm?.items?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
      setBagQuantity(quantity)
    }
  }, [orderForm]);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === 'ios' ? 'topBarShadow' : null}
      leftButton={{
        name: 'ArrowBack',
        size: 24,
        onPress: () => {
          if (backButtonPress) {
            backButtonPress();
            return;
          }
          if(!navigateGoBack){
            navigation.navigate('Home');
            return;
          }
          navigation.goBack();
        },
      }}
      rightButton1={{
        name: 'Search',
        size: 24,
        onPress: () => {
          navigation.navigate('SearchMenu');
        },
      }}
      rightButton2={{
        name: 'Handbag',
        size: 24,
        onPress: () => {
          // Alert.alert('button right 2');
          navigation.navigate('BagScreen');
        },
        badgeCount: bagQuantity,
      }}
      height={50}
    />
  );
};
