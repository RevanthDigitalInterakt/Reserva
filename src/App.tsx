import { ThemeProvider } from '@emotion/react';

import React from 'react';

import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { theme } from 'reserva-ui';

import 'react-native-gesture-handler';

import AppRouting from './routes/StackNavigator';

import { Provider } from 'react-redux';

import store from './store/index';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Provider store={store}>
					<AppRouting />
				</Provider>
			</NavigationContainer>
		</ThemeProvider>
	);
};

export default App;
