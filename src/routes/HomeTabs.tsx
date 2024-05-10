import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import { theme } from '../base/usereservappLegacy/theme';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import Home from '../pages/Home';
import NewProductCatalog from '../pages/ProductCatalog';
import WishList from '../pages/WishList/WishList';
import { TabBar } from './TabBar';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { Modal } from '../components/Modal';
import { BlockedRouletDescription } from '../components/Modal/components/BlockedRouletDescription';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import CallCenter from '../modules/CallCenter';
import { useHomeStore } from '../zustand/useHomeStore';
import EventProvider from '../utils/EventProvider';

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  const { rouletCoupon, actions } = useBagStore(['rouletCoupon', 'actions']);
  const { getBoolean } = useRemoteConfig();
  const showRoulet = getBoolean('show_roulet');
  const { hasTabBar } = useHomeStore(['hasTabBar']);

  return (
    <>
      <Modal
        description={<BlockedRouletDescription onPress={() => actions.UNBLOCK_ROULET_COUPON()} />}
        isVisible={rouletCoupon.blocked}
        handleClose={() => actions.UNBLOCK_ROULET_COUPON()}
        title="Roleta Reserva"
      />
      <SafeAreaView
        style={{ backgroundColor: theme.colors.white, marginBottom: hasTabBar ? 0 : -42 }}
        flex={1}
        testID="com.usereserva:id/home_tabs_buttons"
      >
        <Tab.Navigator tabBar={(props) => (hasTabBar ? <TabBar {...props} /> : null)}>
          <Tab.Screen
            name="Home"
            component={Home}
            initialParams={{ label: 'Início' }}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Offers"
            component={NewProductCatalog}
            listeners={{
              tabPress: () => {
                EventProvider.logEvent('offers_tab_click', {});
              },
            }}
            initialParams={{
              safeArea: false,
              label: 'Promoções',
            }}
            options={{ headerShown: false }}
          />
          {showRoulet ? (
            <Tab.Screen
              name="Roulet"
              component={Home}
              initialParams={{ label: 'Roleta' }}
              options={{
                headerShown: false,
              }}
            />
          ) : null}
          <Tab.Screen
            name="WishList"
            component={WishList}
            initialParams={{ label: 'Favoritos' }}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={MenuProfile}
            initialParams={{ label: 'Perfil' }}
            options={{ headerShown: false }}
          />
          {!showRoulet ? (
            <Tab.Screen
              name="Call"
              listeners={{
                tabPress: () => {
                  EventProvider.logEvent('call_center_tab_click', {});
                },
              }}
              component={CallCenter}
              initialParams={{ label: 'Central' }}
              options={{ headerShown: false }}
            />
          ) : null}
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}
