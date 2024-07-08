import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../../utils/EventProvider';

interface NewTopBarDefaultProps {
  showShadow?: Boolean;
  loading?: Boolean;
}

export function NewWhiteTopBarDefault({ loading = false }: NewTopBarDefaultProps) {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

  const handleNavigateToMenu = () => {
    navigation.navigate('Menu');
    EventProvider.logEvent('menu_click', {});
  };

  const handleNavigateToBag = () => {
    navigation.navigate('BagScreen');
    EventProvider.logEvent('bag_click', {});
  };

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      leftButton={{
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: () => handleNavigateToMenu,
      }}
      rightButton2={{
        name: 'Handbag',
        testID: 'com.usereserva:id/button_bag',
        size: 24,
        onPress: () => handleNavigateToBag(),
        badgeCount: allItemsQuantity,
      }}
      height={50}
    />
  );
}
