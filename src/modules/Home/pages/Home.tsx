import * as React from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';

export const HomeScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const dispatch = useDispatch();
	const repositories = useSelector((state: ApplicationState) => state.repositories.data);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{repositories.map((repository) => {
				return <Text>{repository.name}</Text>;
			})}
		</View>
	);
};
