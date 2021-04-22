import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TopBar } from 'reserva-ui';

export const TopBarBackButton: React.FC<{
	backButtonPress: () => void;
}> = ({ backButtonPress }) => {
	const navigation = useNavigation();

	return (
		<TopBar
			paddingX="quarck"
			bg="white"
      showLogo={false}
			leftButton={{
				name: 'ArrowBack',
				color: 'preto',
				size: 24,
				onPress: () => {
					backButtonPress()
				}
			}}
			height={50}
		/>
	);
};
