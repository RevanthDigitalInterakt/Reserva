import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';

export const HomeScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const dispatch = useDispatch();
	const repositories = useSelector((state: ApplicationState) => state.repositories);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<Box variant="container" alignItems="center" justifyContent="center">
			<Typography variant="heading1">Lista de Repositórios</Typography>
			{repositories.loading ? (
				<Typography>Loading</Typography>
			) : (
				repositories.data.map((repository) => {
					return <Typography>{repository.name}</Typography>;
				})
			)}
		</Box>
	);
};
