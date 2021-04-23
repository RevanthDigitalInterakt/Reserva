import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert } from 'react-native';
import { TopBar } from 'reserva-ui';

export const TopBarBackButton: React.FC<{
	showShadow?: Boolean;
}> = ({ showShadow = true }) => {
	const navigation = useNavigation();

	return (
		<TopBar
			paddingX="xxxs"
			bg="white"
			boxShadow={showShadow ? 'topBarShadow' : null}
			leftButton={{
				name: 'ArrowBack',
				size: 24,
				onPress: () => {
					navigation.goBack();
				}
			}}
			height={50}
		/>
	);
};
