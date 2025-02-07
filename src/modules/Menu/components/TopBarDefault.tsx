import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../utils/EventProvider';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import useModalGeolocationStore from '../../../zustand/useModalGeolocationStore';

interface ITopbarMain {
  showShadow?: boolean;
  loading?: boolean;
  showInHome?: boolean;
}

export default function TopBarDefault({
  loading,
  showShadow,
  showInHome,
}: ITopbarMain) {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);
  const { onStartLoad } = usePageLoadingStore(['onStartLoad']);
  const { modalGeolocationController } = useModalGeolocationStore(['modalGeolocationController']);

  const handleNavigateToMenu = useCallback(() => {
    navigation.navigate('Menu');
    EventProvider.logEvent('menu_click', {});
  }, []);

  const handleNavigateToSearch = useCallback(() => {
    EventProvider.logEvent('top_bar_search_click', { open: 1 });
    navigation.navigate('SearchMenu');
    onStartLoad('Search');
  }, []);
  return (
    <TopBar
      loading={loading || false}
      paddingX="quarck"
      bg="white"
      style={{ elevation: 10 }}
      boxShadow={showShadow && Platform.OS === platformType.IOS ? 'topBarShadow' : null}
      leftButton={{
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: handleNavigateToMenu,
      }}
      rightButton1={{
        name: 'Search',
        size: 24,
        testID: 'com.usereserva:id/header_button_search',
        onPress: handleNavigateToSearch,
      }}
      rightButton2={{
        name: 'Handbag',
        testID: 'com.usereserva:id/button_bag',
        size: 24,
        onPress: () => navigation.navigate('BagScreen'),
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
