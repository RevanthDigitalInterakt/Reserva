import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TopBar } from '@usereservaapp/reserva-ui';
import { useCart } from '../../../context/CartContext';

export const TopBarMenu: React.FC<{ loading: Boolean }> = ({
  loading = false,
}) => {
  const navigation = useNavigation();
  const { orderForm } = useCart();
  const [bagQuantity, setBagQuantity] = useState(0);

  useEffect(() => {
    if (orderForm?.items) {
      const quantity = orderForm?.items?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
      setBagQuantity(quantity);
    }
  }, [orderForm]);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      leftButton={{
        testID: 'com.usereserva:id/top_bar_button',
        marginTop: 'nano',
        color: 'preto',
        name: 'Close',
        size: 14,
        onPress: () => {
          navigation.goBack();
        },
      }}
      rightButton1={{
        testID: 'com.usereserva:id/top_bar_search_menu_button',
        name: 'Search',
        size: 24,
        onPress: () => {
          navigation.navigate('SearchMenu');
        },
      }}
      rightButton2={{
        testID: 'com.usereserva:id/top_bar_button_handbag',
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
