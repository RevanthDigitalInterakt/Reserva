import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Divider, Icon, TextField, theme, Typography } from 'reserva-ui';
import { TopBarMenu } from '../components/TopBarMenu';

export const Menu: React.FC<{}> = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
			<Box flex={1} backgroundColor="backgroundMenu">
				<TopBarMenu />
				<Box paddingX="nano" paddingY="nano">
					<TextField label="Buscar" error="Something went wrong" />
				</Box>
				<Divider variant="fullWidth" marginY="xxxs" />
				<Box justifyContent="space-between" marginY="nano" flexDirection="row" marginX="xxs">
					<Typography fontSize={13} fontFamily="nunito" fontWeight="bold">
						NOVIDADES
					</Typography>
					<Box>
						<Icon name="RightArrow" color="preto" size={24} />
					</Box>
				</Box>
				<Box justifyContent="space-between" marginY="nano" flexDirection="row" marginX="xxs">
					<Typography fontSize={13} fontFamily="nunito" fontWeight="bold">
						MASCULINO
					</Typography>
					<Box>
						<Icon name="RightArrow" color="preto" size={24} />
					</Box>
				</Box>
				<Divider variant="fullWidth" marginY="xxxs" />
			</Box>
		</SafeAreaView>
	);
};
