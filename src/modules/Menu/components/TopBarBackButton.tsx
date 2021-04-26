import * as React from 'react';
import { Platform } from 'react-native';
import { TopBar } from 'reserva-ui';

export const TopBarBackButton: React.FC<{
	showShadow?: Boolean;
	backButtonPress: () => void;
}> = ({ showShadow = true, backButtonPress }) => {

	return (
		<TopBar
			paddingX="quarck"
			bg="white"
			showLogo
			boxShadow={showShadow && Platform.OS === "ios" ? "topBarShadow" : null}
			leftButton={{
				name: 'ArrowBack',
				size: 24,
				onPress: () => {
					backButtonPress();
				}
			}}
			height={50}
		/>
	);
};
