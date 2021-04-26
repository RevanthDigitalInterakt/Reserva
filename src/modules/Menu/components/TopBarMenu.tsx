import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert } from 'react-native';
import { TopBar } from 'reserva-ui';

export const TopBarMenu: React.FC<{}> = () => {
	const navigation = useNavigation();

	return (
		<TopBar
			paddingX="quarck"
			bg="white"
			leftButton={{
				marginTop: 'nano',
				color: 'preto',
				name: 'Close',
				size: 18,
				onPress: () => {
					navigation.goBack();
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
