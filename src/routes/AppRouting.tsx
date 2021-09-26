import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { horizontalAnimationBackwards } from '../animations/animations';
import { Menu } from '../modules/Menu/modals/Menu';

import { MainStackScreen } from './StackNavigator';

const RootStack = createStackNavigator();

export const AppRouting = () => (
  <RootStack.Navigator
    mode="modal"
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <RootStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    {/* After that you put modal Screens */}
    <RootStack.Screen
      name="Menu"
      options={horizontalAnimationBackwards}
      component={Menu}
    />
  </RootStack.Navigator>
);
