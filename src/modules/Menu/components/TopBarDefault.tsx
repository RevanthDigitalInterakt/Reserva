import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { TopBar } from '@usereservaapp/reserva-ui';
import { useCart } from '../../../context/CartContext';

export const TopBarDefault: React.FC<{
  showShadow?: Boolean;
  loading?: Boolean;
}> = ({ showShadow = true, loading = false }) => {
  const navigation = useNavigation();
  const { orderForm } = useCart();
  const [bagQuantity, setBagQuantity] = useState(0);
  useEffect(() => {
    if (orderForm?.items) {
      const quantity = orderForm?.items?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
      );
      setBagQuantity(quantity);
    }
  }, [orderForm]);

  useEffect(() => {
  }, [bagQuantity]);
  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      style={{ elevation: 10 }}
      boxShadow={showShadow && Platform.OS === 'ios' ? 'topBarShadow' : null}
      leftButton={{
        name: 'SideMenu',
        testID: 'header_button_menu',
        size: 24,
        onPress: () => {
          navigation.navigate('Menu');
        },
      }}
      rightButton1={{
        name: 'Search',
        size: 24,
        testID: 'header_button_search',
        onPress: () => {
          navigation.navigate('SearchMenu');
        },
      }}
      rightButton2={{
        name: 'Handbag',
        testID: 'header_button_bag',
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
