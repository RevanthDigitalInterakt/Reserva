import { ApolloProvider } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import appsFlyer from 'react-native-appsflyer';
import 'react-native-gesture-handler';
import { theme } from 'reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import CodepushConfig from './config/codepush';
import { env } from './config/env';
import { linkingConfig } from './config/linking';
import { oneSignalConfig } from './config/pushNotification';
import './config/ReactotronConfig';
import AuthContextProvider from './context/AuthContext';
import { CacheImagesProvider } from './context/CacheImagesContext';
import ChronometerContextProvider from './context/ChronometerContext';
import CartContextProvider from './context/CartContext';
import { FirebaseContextProvider, RemoteConfigKeys, useFirebaseContext } from './context/FirebaseContext';
import InitialScreen from './InitialScreen';
import { Maintenance } from './modules/Home/pages/Maintenance';
import { AppRouting } from './routes/AppRouting';
import { apolloClient } from './services/apolloClient';
import { RemoteConfigService } from "./shared/services/RemoteConfigService";
import RegionalSearchContext from 'context/RegionalSearchContext';
import RegionalSearchContextProvider from './context/RegionalSearchContext';



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

const logAppOpenAnalytics = async () => {
  try {
    await analytics().logAppOpen();
  } catch (e) {
    console.log(e);
  }
};

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};



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
const maintenanceHandler = async () => {
  const result = await RemoteConfigService.fetchValues()
  const maintenance = result.find(x => x.key === RemoteConfigKeys.SCREEN_MAINTENANCE)
  //setIsOnMaintenance(maintenance.value)
  return maintenance.value
}

const App = () => {
  const { getValue } = useFirebaseContext()

  const [isOnMaintenance, setIsOnMaintenance] = useState(false)

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
    requestUserPermission();
    logAppOpenAnalytics();
    CodepushConfig();
    oneSignalConfig();
    setTimeout(() => {
      maintenanceHandler().then(res => setIsOnMaintenance(res))
    }, 5000);
  }, []);

  return <ThemeProvider theme={theme}>
    <NavigationContainer linking={linkingConfig} theme={DefaultTheme}>
      {
        isOnMaintenance ?
          <Maintenance isVisible />
          :
          <CartContextProvider>
            <AuthContextProvider>
              <RegionalSearchContextProvider>
                <CacheImagesProvider>
                  <FirebaseContextProvider>
                    <ChronometerContextProvider>
                      <ApolloProvider client={apolloClient}>
                        <InitialScreen>
                          <AppRouting />
                        </InitialScreen>
                      </ApolloProvider>
                    </ChronometerContextProvider>
                  </FirebaseContextProvider>
                </CacheImagesProvider>
              </RegionalSearchContextProvider>
            </AuthContextProvider>
          </CartContextProvider>
      }
    </NavigationContainer>
  </ThemeProvider>
};

export default App;
