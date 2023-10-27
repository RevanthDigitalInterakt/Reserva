import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import horizontalAnimationBackwards from './animations/horizontalAnimationBackwards';
import { MainStackScreen } from './StackNavigator';
import Menu from '../pages/Menu';

const RootStack = createStackNavigator();

export function AppRouting() {
  return (
    <RootStack.Navigator
      initialRouteName="Main"
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
}
