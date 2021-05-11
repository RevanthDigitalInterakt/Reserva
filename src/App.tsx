import { ThemeProvider } from "styled-components/native";

import React from "react";

import { Alert, useColorScheme } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { theme, platformHelper } from "reserva-ui";

import "react-native-gesture-handler";

import AppRouting from "./routes/StackNavigator";

import { Provider } from "react-redux";

import store from "./store/index";

import * as Sentry from "@sentry/react-native";

import { env } from "./config/env";
import InitialScreen from "./InitialScreen";

import codePush from "react-native-code-push";
import { useEffect } from "react";

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

  useEffect(() => {
    codePush.sync(
      {},
      (status) => {
        switch (status) {
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            Alert.alert("Uma atualização foi encontrada e está sendo baixada");
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
          // Hide "downloading" modal
          case codePush.SyncStatus.UPDATE_INSTALLED:
            Alert.alert(
              "Atualização instalada com sucesso!",
              "Favor reiniciar o aplicativo"
            );
            // Hide "downloading" modal
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        /* Update download modal progress */
      }
    );
  }, []);

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

export default codePush(App);
