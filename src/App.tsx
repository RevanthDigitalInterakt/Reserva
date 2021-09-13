import { ThemeProvider } from "styled-components/native";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "reserva-ui";
import { ApolloProvider } from '@apollo/client';
import AppRouting from "./routes/StackNavigator";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/react-native";
import codePush from "react-native-code-push";
import appsFlyer from 'react-native-appsflyer';


import { PersistGate } from "redux-persist/integration/react";
import { oneSignalConfig } from "./config/pushNotification";
import { apolloClient } from "./services/apolloClient";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import { env } from "./config/env";
import InitialScreen from "./InitialScreen";
import configureStore from "./store/index";

import './config/ReactotronConfig'
import "react-native-gesture-handler";

Sentry.init({
  dsn: env.SENTRY_KEY,
});

// SET THE DEFAULT BACKGROUND COLOR TO ENTIRE APP
const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

var onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
  (res) => {
      if (JSON.parse(res.data.is_first_launch) == true) {
          if (res.data.af_status === 'Non-organic') {
              var media_source = res.data.media_source;
              var campaign = res.data.campaign;
              console.log('This is first launch and a Non-Organic install. Media source: ' + media_source + ' Campaign: ' + campaign);
          } else if (res.data.af_status === 'Organic') {
              console.log('This is first launch and a Organic Install');
          }
      } else {
          console.log('This is not first launch');
      }
  },
);

var onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution((res) => {
  console.log(res);
});

appsFlyer.initSdk(
  {
    devKey: env.APPSFLYER.DEV_KEY,
    isDebug: false,
    appId: env.APPSFLYER.APP_ID,
    onInstallConversionDataListener: true, //Optional
    onDeepLinkListener: true, //Optional
    timeToWaitForATTUserAuthorization: 10 //for iOS 14.5
  },
  (result) => {
    console.log("AAPPFLYERS", result);
  },
  (error) => {
    console.log("AAPPFLYERS", error);
  }
);

const App = () => {
  useEffect(() => {
    return () => {
      if(onInstallConversionDataCanceller) {
        onInstallConversionDataCanceller();
        console.log('unregister onInstallConversionDataCanceller');
        onInstallConversionDataCanceller = null;
      }
      
      if (onAppOpenAttributionCanceller) {
        onAppOpenAttributionCanceller();
        console.log('unregister onAppOpenAttributionCanceller');
        onAppOpenAttributionCanceller = null;
      }
    }
  })
  useEffect(() => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.ON_NEXT_RESTART,
        updateDialog: {
          title: 'An OTA update is available',
        },
        rollbackRetryOptions: {
          delayInHours: 0.1,
          maxRetryAttempts: 1,
        },
      },
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

    oneSignalConfig();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={DefaultTheme}>
        <CartContextProvider>
          <AuthContextProvider>
            <ApolloProvider client={apolloClient}>
              <Provider store={configureStore().store}>
                <PersistGate persistor={configureStore().persistor}>
                  <InitialScreen>
                    <AppRouting />
                  </InitialScreen>
                </PersistGate>
              </Provider>
            </ApolloProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default codePush(App);
