import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import { theme } from '../base/usereservappLegacy/theme';
import CallCenter from '../modules/CallCenter';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import Home from '../pages/Home';
import NewProductCatalog from '../pages/ProductCatalog';
import WishList from '../pages/WishList/WishList';
import { TabBar } from './TabBar';

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
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
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Offers"
          component={NewProductCatalog}
          initialParams={{
            safeArea: false,
            label: 'Promoções',
          }}
          options={{ headerShown: false }}

        />
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
        <Tab.Screen
          name="Call"
          component={CallCenter}
          initialParams={{ label: 'Central' }}
          options={{ headerShown: false }}

        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
