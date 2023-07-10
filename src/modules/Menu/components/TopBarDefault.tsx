import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';

export const TopBarDefault: React.FC<{
  showShadow?: Boolean;
  loading?: Boolean;
}> = ({ showShadow = true, loading = false }) => {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

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
        onPress: () => navigation.navigate('Menu'),
      }}
      rightButton1={{
        name: 'Search',
        size: 24,
        testID: 'com.usereserva:id/header_button_search',
        onPress: () => navigation.navigate('SearchMenu'),
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
