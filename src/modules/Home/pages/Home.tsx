import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, HomeCard, BottomBar, TopBar } from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';
import { RepositoriesState } from '../../../store/ducks/repositories/types';

export const HomeScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const dispatch = useDispatch();
	// const repositories = useSelector((state: ApplicationState) => state.repositories);

	const { repositories } = useSelector((state: ApplicationState) => state);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<Box flex={1}>
			<Box>
				<TopBar
					paddingX="xxxs"
					bg="white"
					boxShadow="topBarShadow"
					leftButton={{
						name: 'SideMenu',
						size: 24,
						onPress: () => {
							Alert.alert('button left');
						}
					}}
					rightButton1={{
						name: 'Heart',
						size: 24,
						onPress: () => {
							Alert.alert('button right 1');
						}
					}}
					rightButton2={{
						name: 'Handbag',
						size: 24,
						onPress: () => {
							Alert.alert('button right 2');
						}
					}}
					height={50}
				/>
			</Box>

			<Box variant="container" alignItems="flex-start" justifyContent="center">
				<Typography variant="descontoTag1">Lista de Repositórios</Typography>
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
