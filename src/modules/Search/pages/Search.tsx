import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, HomeCard, BottomBar } from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';

export const SearchScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const dispatch = useDispatch();
	const repositories = useSelector((state: ApplicationState) => state.repositories);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<SafeAreaView flex={1}>
			<Box variant="container" alignItems="center" justifyContent="center">
				<Typography variant="tituloSessoes">Lista de Repositórios</Typography>
				{repositories.loading ? (
					<Typography>Loading</Typography>
				) : (
					repositories.data.map((repository) => {
						return <Typography>{repository.id}</Typography>;
					})
				)}
			</Box>
		</SafeAreaView>
	);
};
