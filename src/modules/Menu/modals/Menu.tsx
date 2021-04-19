import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Divider, theme, Typography } from 'reserva-ui';
import { TopBarMenu } from '../components/TopBarMenu';

export const Menu: React.FC<{}> = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
			<Box flex={1} bg="white">
				<TopBarMenu />
				<Divider variant="fullWidth" marginY="xxxs" />
				<Box marginY="xxxs" marginX="xxs">
					<Typography variant="tituloSessao">ROUPAS</Typography>
				</Box>
				<Box marginY="quarck" marginX="xxs">
					<Typography variant="tituloSessao">Camisetas</Typography>
				</Box>
				<Box marginY="quarck" marginX="xxs">
					<Typography variant="tituloSessao">Camisas</Typography>
				</Box>
				{/* <Divider variant="fullWidth" marginX="xxs" marginY="quarck" /> */}
			</Box>
		</SafeAreaView>
	);
};
