import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../modules/Home/pages/Home';

import * as React from 'react';
import { BottomBar, BottomBarButton, Box } from 'reserva-ui';

const Tab = createBottomTabNavigator();

export const MyTabBar = ({ state, descriptors, navigation }) => {
	// const focusedOptions = descriptors[state.routes[state.index].key].options;

	// if (focusedOptions.tabBarVisible === false) {
	// 	return null;
	// }

	// const { options } = descriptors[route.key];
	// const label =
	// 	options.tabBarLabel !== undefined
	// 		? options.tabBarLabel
	// 		: options.title !== undefined ? options.title : route.name;

	// const isFocused = state.index === index;

	// const onPress = () => {
	// 	const event = navigation.emit({
	// 		type: 'tabPress',
	// 		target: route.key,
	// 		canPreventDefault: true
	// 	});

	// 	if (!isFocused && !event.defaultPrevented) {
	// 		navigation.navigate(route.name);
	// 	}
	// };

	// const onLongPress = () => {
	// 	navigation.emit({
	// 		type: 'tabLongPress',
	// 		target: route.key
	// 	});
	// };

	// 			{state.routes.map((route, index) => {

	return (
		<Box>
			<BottomBar>
				<BottomBarButton iconName="Home" isSlected={true} onPress={() => {}} />
				<BottomBarButton iconName="SearchMenu" onPress={() => {}} />
				<BottomBarButton iconName="Offers" onPress={() => {}} />
				<BottomBarButton iconName="Profile" onPress={() => {}} />
			</BottomBar>
		</Box>
		// <View style={{ flexDirection: 'row' }}>
		// 			{/* <TouchableOpacity
		// 				accessibilityRole="button"
		// 				accessibilityState={isFocused ? { selected: true } : {}}
		// 				accessibilityLabel={options.tabBarAccessibilityLabel}
		// 				testID={options.tabBarTestID}
		// 				onPress={onPress}
		// 				onLongPress={onLongPress}
		// 				style={{ flex: 1 }}
		// 			>
		// 				<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text>
		// 			</TouchableOpacity>
		// 		); */}
		// </View>
	);
};

export const Tabs = () => {
	return (
		<SafeAreaView flex={1}>
			<Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Search" component={HomeScreen} />
				<Tab.Screen name="Deals" component={HomeScreen} />
				<Tab.Screen name="Profile" component={HomeScreen} />
			</Tab.Navigator>
		</SafeAreaView>
	);
};
