// In App.js in a new project
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../modules/Home/pages/Home';
import { SearchScreen } from '../modules/Search/pages/Search';
import { Tabs } from './BottomTabNavigator';
import { Menu } from '../modules/Menu/modals/Menu';

import { horizontalAnimationBackwards } from './utils/utils';
import { ExampleScreen } from '../modules/Example/screens/Example';
import { RegisterStep1 } from '../modules/Register/pages/Step1';
import { RegisterStep2 } from '../modules/Register/pages/Step2';
import { RegisterStep3 } from '../modules/Register/pages/Step3';
import { RegisterStep4 } from '../modules/Register/pages/Step4';
import { RegisterStep5 } from '../modules/Register/pages/Step5';
import { RegisterSuccess } from '../modules/Register/pages/RegisterSuccess';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
	// Here you put normal navigation
	return (
		<MainStack.Navigator screenOptions={{ headerShown: false }}>
			<MainStack.Screen name="HomeTabs" component={Tabs} />
			<MainStack.Screen name="Example" component={ExampleScreen} />
			<MainStack.Screen name="SearchMenu" component={SearchScreen} />
			<MainStack.Screen name="RegisterStep1" component={RegisterStep1} />
			<MainStack.Screen name="RegisterStep2" component={RegisterStep2} />
			<MainStack.Screen name="RegisterStep3" component={RegisterStep3} />
			<MainStack.Screen name="RegisterStep4" component={RegisterStep4} />
			<MainStack.Screen name="RegisterStep5" component={RegisterStep5} />
			<MainStack.Screen name="RegisterSuccess" component={RegisterSuccess} />
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
