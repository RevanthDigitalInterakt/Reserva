import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../utils/EventProvider';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';

export const TopBarDefault: React.FC<{
  showShadow?: Boolean;
  loading?: Boolean;
}> = ({ showShadow = true, loading = false }) => {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);
  const { onStartLoad } = usePageLoadingStore(['onStartLoad']);

  const handleNavigateToMenu = () => {
    navigation.navigate('Menu');
    EventProvider.logEvent('menu_click', {});
  };

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      style={{ elevation: 10 }}
      boxShadow={showShadow && Platform.OS === platformType.IOS ? 'topBarShadow' : null}
      leftButton={{
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: () => handleNavigateToMenu(),
      }}
      rightButton1={{
        name: 'Search',
        size: 24,
        testID: 'com.usereserva:id/header_button_search',
        onPress: () => {
          EventProvider.logEvent('top_bar_search_click', { open: 1 });
          navigation.navigate('SearchMenu');
          onStartLoad('Search');
        },
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
};
