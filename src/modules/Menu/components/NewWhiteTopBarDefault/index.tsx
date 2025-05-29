import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TopBar } from '../../../../components/TopBar';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../../utils/EventProvider';
import useModalGeolocationStore from '../../../../zustand/useModalGeolocationStore';

interface NewTopBarDefaultProps {
  showShadow?: Boolean;
  loading?: Boolean;
  showInHome?: boolean;
}

export function NewWhiteTopBarDefault({ loading = false, showInHome }: NewTopBarDefaultProps) {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);
  const { modalGeolocationController } = useModalGeolocationStore(['modalGeolocationController']);

  const handleNavigateToMenu = useCallback(() => {
    navigation.navigate('Menu');
    EventProvider.logEvent('menu_click', {});
  }, []);

  const handleNavigateToBag = useCallback(() => {
    navigation.navigate('BagScreen');
    EventProvider.logEvent('bag_click', {});
  }, []);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      leftButton={{
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: handleNavigateToMenu,
      }}
      rightButton2={{
        name: 'Handbag',
        testID: 'com.usereserva:id/button_bag',
        size: 24,
        onPress: handleNavigateToBag,
        badgeCount: allItemsQuantity,
      }}
      height={50}
      locationButton={{
        iconColor: 'black',
        showButton: showInHome,
        onPress: modalGeolocationController,
      }}
    />
  );
}
