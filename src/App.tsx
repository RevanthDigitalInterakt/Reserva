import { ThemeProvider } from '@emotion/react';

import React from 'react';

import { useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { theme, platformHelper } from 'reserva-ui';

import 'react-native-gesture-handler';

import AppRouting from './routes/StackNavigator';

import { Provider } from 'react-redux';

import store from './store/index';

import * as Sentry from '@sentry/react-native';

import { env } from './config/env';

Sentry.init({
	dsn: env.SENTRY_KEY
});

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<ThemeProvider theme={platformHelper(theme)}>
			<NavigationContainer>
				<Provider store={store}>
					<AppRouting />
				</Provider>
			</NavigationContainer>
		</ThemeProvider>
	);
};

export default App;
