import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Divider, Icon, SearchBar, TextField, theme, Typography } from 'reserva-ui';
import { TopBarMenu } from '../components/TopBarMenu';

interface IBreadCumbs {
	title: string;
}
interface IMenuItem {
	title: string;
	opened?: boolean;
}

const Breadcumbs: React.FC<IBreadCumbs> = ({ title }) => {
	return (
		<Box paddingX="micro" paddingTop="xxxs" alignItems="center" flexDirection="row">
			<Icon style={{ transform: [ { rotate: '180deg' } ] }} name="RightArrow" color="preto" size={22} />
			<Box paddingX="micro">
				<Typography fontSize={12} fontFamily="nunitoRegular" fontWeight="normal">
					Pagina Inicial
				</Typography>
			</Box>
		</Box>
	);
};

const MenuItem: React.FC<IMenuItem> = ({ title, opened }) => {
	return (
		<Box justifyContent="space-between" marginY="micro" flexDirection="row" marginX="xxs">
			<Typography fontSize={13} fontFamily="nunitoBold" fontWeight="bold">
				{title.toUpperCase()}
			</Typography>
			<Box>
				<Icon
					style={{ transform: [ { rotate: opened ? '90deg' : '0deg' } ] }}
					name="ChevronRight"
					color="preto"
					size={16}
				/>
			</Box>
		</Box>
	);
};

export const Menu: React.FC<{}> = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
			<Box flex={1} backgroundColor="backgroundMenu">
				<TopBarMenu />
				<Box paddingX="nano" paddingTop="micro">
					<SearchBar height={36} placeholder="Buscar" />
				</Box>
				<Breadcumbs title="paginaInicial" />
				<Divider variant="fullWidth" marginY="xxxs" />
				<MenuItem title={'Novidades'} />
			</Box>
		</SafeAreaView>
	);
};
