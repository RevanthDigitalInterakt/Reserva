import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Divider, Icon, SearchBar, TextField, theme, Typography } from 'reserva-ui';
import { TopBarMenu } from '../components/TopBarMenu';

export const Menu: React.FC<{}> = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
			<Box flex={1} backgroundColor="backgroundMenu">
				<TopBarMenu />
				<Box paddingX="nano" paddingTop={10}>
					<SearchBar placeholder="Buscar" height={32} />
				</Box>
				<Box paddingX="micro" paddingTop="xxxs" alignItems="center" flexDirection="row">
					<Icon style={{ transform: [ { rotate: '180deg' } ] }} name="RightArrow" color="preto" size={22} />
					<Box paddingX="micro">
						<Typography fontSize={12} fontFamily="nunito" fontWeight="normal">
							Pagina Inicial
						</Typography>
					</Box>
				</Box>
				<Divider variant="fullWidth" marginY="xxxs" />
				<Box justifyContent="space-between" marginY="nano" flexDirection="row" marginX="xxs">
					<Typography fontSize={15} fontFamily="nunito" fontWeight="bold">
						NOVIDADES
					</Typography>
					<Box>
						<Icon name="ChevronRight" color="preto" size={16} />
					</Box>
				</Box>
				<Divider variant="fullWidth" marginY="xxxs" />
			</Box>
		</SafeAreaView>
	);
};
