import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native';
import { theme } from 'reserva-ui';

import CallCenter from '../modules/CallCenter';
import { HomeScreen } from '../modules/Home/pages/Home';
import { ProductCatalog } from '../modules/ProductCatalog/pages/ProductCatalog';
import { MenuProfile } from '../modules/Profile/pages/MenuProfile';
import { WishList } from '../modules/WishList/pages/WishList';

import { TabBar } from './TabBar';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => (
  <SafeAreaView style={{ backgroundColor: theme.colors.white }} flex={1}>
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ label: 'Início' }}
      />
      <Tab.Screen
        name="Offers"
        component={ProductCatalog}
        initialParams={{
          safeArea: false,
          categoryId: 'reserva-bazar-camisetas',
          label: 'Promoções',
          referenceId: 'collection:371',
          facetInput: [
            {
              key: 'category-2',
              value: 'masculino',
            },
            {
              key: 'productClusterIds',
              value: '326',
            },
          ],
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
