import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { horizontalAnimationBackwards } from '../animations/animations';
import { Menu } from '../modules/Menu/modals/Menu';

import { MainStackScreen } from './StackNavigator';
import { Onboarding } from '../modules/Onboarding/pages/Onboarding';
import AsyncStorage from '@react-native-community/async-storage';

const RootStack = createStackNavigator();

interface AppRoutingProps {
  isFirstLaunched: boolean;
}

export const AppRouting = ({ isFirstLaunched }: AppRoutingProps) => (
  <RootStack.Navigator
    initialRouteName={isFirstLaunched ? 'Onboarding' : 'Main'}
    mode="modal"
    screenOptions={{ headerShown: false }}
  >
    <RootStack.Screen
      name="Onboarding"
      component={Onboarding}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />

    <RootStack.Screen
      name="Menu"
      options={horizontalAnimationBackwards}
      component={Menu}
    />
  </RootStack.Navigator>
);
