import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '@usereservaapp/reserva-ui';
import { SafeAreaView } from 'react-native';

import CallCenter from '../modules/CallCenter';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import Home from '../pages/Home';
import NewProductCatalog from '../pages/ProductCatalog';
import { TabBar } from './TabBar';
import WishList from '../pages/WishList/WishList';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => (
  <SafeAreaView
    style={{ backgroundColor: theme.colors.white }}
    flex={1}
    testID="com.usereserva:id/home_tabs_buttons"
  >
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ label: 'Início' }}
      />
      <Tab.Screen
        name="Offers"
        component={NewProductCatalog}
        initialParams={{
          safeArea: false,
          label: 'Promoções',
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        initialParams={{ label: 'Favoritos' }}
      />
      <Tab.Screen
        name="Profile"
        component={MenuProfile}
        initialParams={{ label: 'Perfil' }}

      />
      <Tab.Screen
        name="Call"
        component={CallCenter}
        initialParams={{ label: 'Central' }}
      />
    </Tab.Navigator>
  </SafeAreaView>
);
