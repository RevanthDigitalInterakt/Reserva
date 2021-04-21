import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert } from 'react-native';
import { TopBar } from 'reserva-ui';

export const TopBarDefault: React.FC<{
	showShadow?: Boolean;
}> = ({ showShadow = true }) => {
	const navigation = useNavigation();

	return (
		<TopBar
			paddingX="xxxs"
			bg="white"
			boxShadow={showShadow ? 'topBarShadow' : null}
			leftButton={{
				name: 'SideMenu',
				color: 'preto',
				size: 24,
				onPress: () => {
					navigation.navigate('Menu');
				}
			}}
			rightButton1={{
				name: 'Heart',
				color: 'preto',
				size: 24,
				onPress: () => {
					Alert.alert('button right 1');
				}
			}}
			rightButton2={{
				name: 'Handbag',
				color: 'preto',
				size: 24,
				onPress: () => {
					Alert.alert('button right 2');
				}
			}}
			height={50}
		/>
	);
};
