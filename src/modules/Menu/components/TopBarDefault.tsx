import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert } from 'react-native';
import { Box, TopBar } from 'reserva-ui';

export const TopBarDefault: React.FC<{}> = () => {
	const navigation = useNavigation();

	return (
		<TopBar
			paddingX="xxxs"
			bg="white"
			boxShadow="topBarShadow"
			leftButton={{
				name: 'SideMenu',
				size: 24,
				onPress: () => {
					navigation.navigate('Menu');
				}
			}}
			rightButton1={{
				name: 'Heart',
				size: 24,
				onPress: () => {
					Alert.alert('button right 1');
				}
			}}
			rightButton2={{
				name: 'Handbag',
				size: 24,
				onPress: () => {
					Alert.alert('button right 2');
				}
			}}
			height={50}
		/>
	);
};
