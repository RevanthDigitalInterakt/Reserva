import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { theme } from '@usereservaapp/reserva-ui';

import CallCenter from '../modules/CallCenter';
import { HomeScreen } from '../modules/Home/pages/Home';
import { ProductCatalog } from '../modules/ProductCatalog/pages/productCatalog/ProductCatalog';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import { WishList } from '../modules/WishList/pages/WishList';

import { TabBar } from './TabBar';

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
        component={HomeScreen}
        initialParams={{ label: 'Início' }}
        options={{
          tabBarTestID: 'com.usereserva:id/home_tab_button_home',
        }}
      />
      <Tab.Screen
        options={{
          tabBarTestID: 'com.usereserva:id/home_tab_button_offers',
        }}
        name="Offers"
        component={ProductCatalog}
        initialParams={{
          safeArea: false,
          label: 'Promoções',
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        initialParams={{ label: 'Favoritos' }}
        options={{
          tabBarTestID: 'com.usereserva:id/home_tab_button_wishilist',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MenuProfile}
        initialParams={{ label: 'Perfil' }}
        options={{
          tabBarTestID: 'com.usereserva:id/home_tab_button_profile',
        }}
      />
      <Tab.Screen
        name="Call"
        component={CallCenter}
        initialParams={{ label: 'Central' }}
        options={{
          tabBarTestID: 'com.usereserva:id/home_tab_button_call',
        }}
      />
    </Tab.Navigator>
  </SafeAreaView>
);
