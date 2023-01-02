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
        marginTop: 'nano',
        color: 'preto',
        name: 'Close',
        size: 14,
        onPress: () => {
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
