// In App.js in a new project
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../modules/Home/pages/Home';
import { SearchScreen } from '../modules/Search/pages/Search';
import { Tabs } from './BottomTabNavigator';
import { Menu } from '../modules/Menu/modals/Menu';

import { horizontalAnimationBackwards } from './utils/utils';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
	// Here you put normal navigation
	return (
		<MainStack.Navigator screenOptions={{ headerShown: false }}>
			<MainStack.Screen name="Home2" component={Tabs} />
			<MainStack.Screen name="Home" component={HomeScreen} />
			<MainStack.Screen name="SearchMenu" component={SearchScreen} />
		</MainStack.Navigator>
	);
};

const AppRouting = () => {
	return (
		<RootStack.Navigator mode="modal" initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
			{/* After that you put modal Screens */}
			<RootStack.Screen name="Menu" options={horizontalAnimationBackwards} component={Menu} />
		</RootStack.Navigator>
	);
};

export default AppRouting;
