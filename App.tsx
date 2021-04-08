/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Box, theme, Typography } from 'reserva-ui';

import 'react-native-gesture-handler';

import AppRouting from './src/routes/StackNavigator';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};

	return (
		<NavigationContainer>
			<ThemeProvider theme={theme}>
				<AppRouting />
			</ThemeProvider>
		</NavigationContainer>
	);
};

export default App;
