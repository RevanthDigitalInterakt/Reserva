// In App.js in a new project
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../modules/Home/pages/Home';
import { Tabs } from './BottomTabNavigator';

const Stack = createStackNavigator();

const AppRouting = () => {
	return (
		<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Tabs} />
			{/* <Stack.Screen name="Home" component={HomeScreen} /> */}
		</Stack.Navigator>
	);
};

export default AppRouting;
