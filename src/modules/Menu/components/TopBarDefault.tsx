import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Platform } from 'react-native';
import { TopBar } from 'reserva-ui';

export const TopBarDefault: React.FC<{
	showShadow?: Boolean;
}> = ({ showShadow = true }) => {
	const navigation = useNavigation();

	return (
		<TopBar
			paddingX="xxxs"
			bg="white"
			style={{ elevation: 10 }}
			boxShadow={showShadow && Platform.OS === 'ios' ? 'topBarShadow' : null}
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
					// Alert.alert('button right 2');
					navigation.navigate('MyAddress');
				}
			}}
			height={50}
		/>
	);
};
