import { ThemeProvider } from "styled-components/native";

import React from "react";

import { useColorScheme } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { theme, platformHelper } from "reserva-ui";

import "react-native-gesture-handler";

import AppRouting from "./routes/StackNavigator";

import { Provider } from "react-redux";

import store from "./store/index";

import * as Sentry from "@sentry/react-native";

import { env } from "./config/env";
import InitialScreen from "./InitialScreen";

Sentry.init({
  dsn: env.SENTRY_KEY,
});

// SET THE DEFAULT BACKGROUND COLOR TO ENTIRE APP
const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={DefaultTheme}>
        <Provider store={store}>
          <InitialScreen>
            <AppRouting />
          </InitialScreen>
        </Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
