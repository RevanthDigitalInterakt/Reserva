import React, { useEffect, useState } from 'react';

import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import codePush from 'react-native-code-push';
import { theme } from 'reserva-ui';
import { ThemeProvider } from 'styled-components/native';

import { env } from './config/env';
import { linkingConfig } from './config/linking';
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';
import InitialScreen from './InitialScreen';

import './config/ReactotronConfig';
import 'react-native-gesture-handler';

import { oneSignalConfig } from './config/pushNotification';
import { StoreUpdate } from './modules/Update/pages/StoreUpdate';
import Update from './modules/Update/pages/Update';
import { AppRouting } from './routes/AppRouting';
import { apolloClient } from './services/apolloClient';

// SET THE DEFAULT BACKGROUND COLOR TO ENTIRE APP
const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

let onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
  (res) => {
    if (JSON.parse(res.data.is_first_launch) == true) {
      if (res.data.af_status === 'Non-organic') {
        const { media_source } = res.data;
        const { campaign } = res.data;
        console.log(
          `This is first launch and a Non-Organic install. Media source: ${media_source} Campaign: ${campaign}`
        );
      } else if (res.data.af_status === 'Organic') {
        console.log('This is first launch and a Organic Install');
      }
    } else {
      console.log('This is not first launch');
    }
  }
);

let onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution((res) => {
  console.log(res);
});

appsFlyer.initSdk(
  {
    devKey: env.APPSFLYER.DEV_KEY,
    isDebug: false,
    appId: env.APPSFLYER.APP_ID,
    onInstallConversionDataListener: true, // Optional
    onDeepLinkListener: true, // Optional
    timeToWaitForATTUserAuthorization: 10, // for iOS 14.5
  },
  (result) => {
    console.log('AAPPFLYERS', result);
  },
  (error) => {
    console.log('AAPPFLYERS', error);
  }
);

const App = () => {
  const [codePushReceivedBytes, setCodePushReceivedBytes] = useState(1);
  const [codePushTotalBytes, setCodePushTotalBytes] = useState(1);

  const [isVisibleCodePush, setIsVisibleCodePush] = useState(false);

  useEffect(() => () => {
    if (onInstallConversionDataCanceller) {
      onInstallConversionDataCanceller();
      console.log('unregister onInstallConversionDataCanceller');
      onInstallConversionDataCanceller = null;
    }

    if (onAppOpenAttributionCanceller) {
      onAppOpenAttributionCanceller();
      console.log('unregister onAppOpenAttributionCanceller');
      onAppOpenAttributionCanceller = null;
    }
  });
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
            setIsVisibleCodePush(true);
            // Alert.alert("Uma atualização foi encontrada e está sendo baixada");
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            setIsVisibleCodePush(false);
            // Hide "downloading" modal
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            Alert.alert(
              'Atualização instalada com sucesso!',
              'Favor reiniciar o aplicativo'
            );
            setIsVisibleCodePush(false);
            // Hide "downloading" modal
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        setCodePushReceivedBytes(receivedBytes);
        setCodePushTotalBytes(totalBytes);
        /* Update download modal progress */
      }
    );

    oneSignalConfig();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer linking={linkingConfig} theme={DefaultTheme}>
        <Update
          isVisible={isVisibleCodePush}
          receivedBytes={codePushReceivedBytes}
          totalBytes={codePushTotalBytes}
        />
        <CartContextProvider>
          <AuthContextProvider>
            <ApolloProvider client={apolloClient}>
              <InitialScreen>
                <AppRouting />
              </InitialScreen>
            </ApolloProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default codePush(App);
