import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button } from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';

export const ExampleScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const navigation = useNavigation();

	const dispatch = useDispatch();

	const { repositories } = useSelector((state: ApplicationState) => state);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<Box flex={1}>
			<TopBarDefault />
			<Box variant="container" alignItems="flex-start" justifyContent="center">
				<Typography variant="descontoTag1">Lista de Repositórios</Typography>
				<Button onPress={() => navigation.navigate('MyModal')} title="Open Modal" />
				{repositories.loading ? (
					<Typography>Loading</Typography>
				) : (
					repositories.data.map((repository) => {
						return <Typography>{repository.name}</Typography>;
					})
				)}
			</Box>
		</Box>
	);
};
