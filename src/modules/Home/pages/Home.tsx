import * as React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';

export const HomeScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const repositories = useSelector((state: ApplicationState) => state.repositories.data);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{repositories.map((repository) => {
				return <Text>{JSON.stringify(repository)}</Text>;
			})}
		</View>
	);
};
