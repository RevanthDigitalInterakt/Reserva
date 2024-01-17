import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

import { platformType } from '../../../utils/platformType';
import { TopBar } from '../../../components/TopBar';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';

export const TopBarDefaultBackButton: React.FC<{
  loading: Boolean;
  showShadow?: Boolean;
  navigateGoBack?: Boolean;
  backButtonPress?: () => void;
  cacheGoingBackRequest?: () => void;
}> = ({
  showShadow = true, loading = false, navigateGoBack = false, backButtonPress, cacheGoingBackRequest,
}) => {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === platformType.IOS ? 'topBarShadow' : null}
      leftButton={{
        testID: 'com.usereserva:id/top_bar_default_button_home',
        name: 'ArrowBack',
        size: 24,
        onPress: () => {
          if (backButtonPress) {
            backButtonPress();
            return;
          }
          if (!navigateGoBack) {
            navigation.navigate('Home');
            return;
          }
          navigation.goBack();
        },
      }}
      rightButton1={{
        testID: 'com.usereserva:id/top_bar_button_searchmenu',
        name: 'Search',
        size: 24,
        onPress: () => navigation.navigate('SearchMenu'),
      }}
      rightButton2={{
        testID: 'com.usereserva:id/top_bar_button_handbag',
        name: 'Handbag',
        size: 24,
        onPress: () => {
          if (cacheGoingBackRequest) {
            cacheGoingBackRequest();
          }
          navigation.navigate('BagScreen');
        },
        badgeCount: allItemsQuantity,
      }}
      height={50}
    />
  );
};
