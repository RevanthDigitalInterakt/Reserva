import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Menu } from '../modules/Menu/modals/Menu';
import horizontalAnimationBackwards from './animations/horizontalAnimationBackwards';
import { MainStackScreen } from './StackNavigator';

const RootStack = createStackNavigator();

export const AppRouting = () => (
  <RootStack.Navigator
    initialRouteName="Main"
    mode="modal"
    screenOptions={{ headerShown: false }}
  >
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
