import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TopBar } from '../../../../components/TopBar';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import styles from './styles';
import EventProvider from '../../../../utils/EventProvider';
import useModalGeolocationStore from '../../../../zustand/useModalGeolocationStore';

interface NewTopBarDefaultProps {
  showShadow?: Boolean;
  loading?: Boolean;
  showInHome?: boolean;
}

export function NewTransparentTopBarDefault(
  { loading = false, showInHome }: NewTopBarDefaultProps,
) {
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
    <LinearGradient
      colors={['rgba(0,0,0,0.5)', 'transparent']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <TopBar
        loading={loading}
        paddingX="quarck"
        leftButton={{
          name: 'SideMenu',
          testID: 'com.usereserva:id/header_button_menu',
          size: 24,
          color: 'white',
          onPress: handleNavigateToMenu,
        }}
        rightButton2={{
          name: 'Handbag',
          testID: 'com.usereserva:id/button_bag',
          size: 24,
          color: 'white',
          onPress: handleNavigateToBag,
          badgeCount: allItemsQuantity,
        }}
        locationButton={{
          iconColor: 'white',
          showButton: showInHome,
          onPress: modalGeolocationController,
        }}
        height={50}
      />
    </LinearGradient>
  );
}
