import React, { useMemo } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import { theme } from '../base/usereservappLegacy/theme';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import Home from '../pages/Home';
import NewProductCatalog from '../pages/ProductCatalog';
import WishList from '../pages/WishList/WishList';
import WebViewFacaVoce from '../pages/WebViewFacaVoce';
import { TabBar } from './TabBar';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { Modal } from '../components/Modal';
import { BlockedRouletDescription } from '../components/Modal/components/BlockedRouletDescription';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { useHomeStore } from '../zustand/useHomeStore';
import EventProvider from '../utils/EventProvider';
import OffersPage from '../pages/Offers/OffersPage';
import UxCam from '../utils/UxCam';

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  const { rouletCoupon, actions } = useBagStore(['rouletCoupon', 'actions']);
  const { getBoolean } = useRemoteConfig();
  const showRoulet = getBoolean('show_roulet');
  const showLabelFacavc = getBoolean('show_label_facavc');
  const { hasTabBar } = useHomeStore(['hasTabBar']);

  const showNewOffersPage = useMemo(
    () => getBoolean('new_offers_page'),
    [getBoolean],
  );

  const getOffersPage = useMemo(() => (showNewOffersPage
    ? OffersPage : NewProductCatalog), [showNewOffersPage]);

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
            listeners={{
              tabPress: () => {
                EventProvider.logScreenViewEvent('/home');
                EventProvider.logEvent('home_tab_click', {});
              },
            }}
          />
          <Tab.Screen
            name="Offers"
            component={getOffersPage}
            listeners={{
              tabPress: () => {
                EventProvider.logScreenViewEvent('/offers');
                EventProvider.logEvent('offers_tab_click', {});
                UxCam.tagScreen('Offers Screen');
              },
            }}
            initialParams={{
              safeArea: false,
              label: 'Promoções',
            }}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="NewOffersPage"
            component={OffersPage}
            listeners={{
              tabPress: () => {
                EventProvider.logScreenViewEvent('/new-offers-page');
                EventProvider.logEvent('new_offers_page_click', {});
              },
            }}
            options={{
              headerShown: false,
            }}
          />
          {showRoulet ? (
            <Tab.Screen
              name="Roulet"
              component={Home}
              initialParams={{ label: 'Roleta' }}
              listeners={{
                tabPress: () => {
                  EventProvider.logScreenViewEvent('/roulet');
                  EventProvider.logEvent('roulet_tab_click', {});
                },

              }}
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
            listeners={{
              tabPress: () => {
                EventProvider.logScreenViewEvent('/wishlist');
                EventProvider.logEvent('wishlist_tab_click', {});
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={MenuProfile}
            initialParams={{ label: 'Perfil' }}
            options={{ headerShown: false }}
            listeners={{
              tabPress: () => {
                EventProvider.logScreenViewEvent('/profile');
                EventProvider.logEvent('profile_tab_click', {});
              },
            }}
          />

          {!showRoulet ? (
            <Tab.Screen
              name="FacaVc"
              component={WebViewFacaVoce}
              initialParams={{ label: showLabelFacavc ? 'Faca.VC' : 'Personalize' }}
              options={{ headerShown: false }}
              listeners={{
                tabPress: () => {
                  EventProvider.logScreenViewEvent('/facavc');

                  if (showLabelFacavc) {
                    EventProvider.logEvent('faca_vc_tab_click', {});

                    return;
                  }

                  EventProvider.logEvent('personalize_tab_click', {});
                },
              }}
            />
          ) : null}
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}
