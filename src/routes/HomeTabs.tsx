import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';

import { theme } from '../base/usereservappLegacy/theme';
import CallCenter from '../modules/CallCenter';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import { WishList } from '../modules/WishList/pages/WishList';
import Home from '../pages/Home';
import NewProductCatalog from '../pages/ProductCatalog';
import { TabBar } from './TabBar';

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.white }}
      testID="com.usereserva:id/home_tabs_buttons"
    >
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
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
}
