import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

interface NewTopBarDefaultProps {
  showShadow?: Boolean;
  loading?: Boolean;
}

export function NewWhiteTopBarDefault({ loading = false }: NewTopBarDefaultProps) {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      leftButton={{
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: () => navigation.navigate('Menu'),
      }}
      rightButton2={{
        name: 'Handbag',
        testID: 'com.usereserva:id/button_bag',
        size: 24,
        onPress: () => navigation.navigate('BagScreen'),
        badgeCount: allItemsQuantity,
      }}
      height={50}
    />
  );
}
