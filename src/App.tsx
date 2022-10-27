import { ApolloProvider } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import 'react-native-gesture-handler';
import { theme } from '@danilomsou/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { env } from './config/env';
import { linkingConfig } from './config/linking';
import { oneSignalConfig } from './config/pushNotification';
import './config/ReactotronConfig';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import PushIOManager from '@oracle/react-native-pushiomanager';
import AuthContextProvider from './context/AuthContext';
import { CacheImagesProvider } from './context/CacheImagesContext';
import ChronometerContextProvider from './context/ChronometerContext';
import CartContextProvider from './context/CartContext';
import {
  FirebaseContextProvider,
  RemoteConfigKeys,
} from './context/FirebaseContext';
import InitialScreen from './InitialScreen';
import { Maintenance } from './modules/Home/pages/Maintenance';
import { AppRouting } from './routes/AppRouting';
import { RemoteConfigService } from './shared/services/RemoteConfigService';
import RegionalSearchContextProvider from './context/RegionalSearchContext';
import ContentfullContextProvider from './context/ContentfullContext';
import {
  apolloClientProduction,
  apolloClientTesting,
} from './services/apolloClient';
import AsyncStorage from '@react-native-community/async-storage';
import { responsysConfig } from './config/responsys';
import StatusBarContextProvider from './context/StatusBarContext';
import ConfigContextProvider from './context/ConfigContext';
import SentryConfig from './config/sentryConfig';

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

let onDeepLinkCanceller = appsFlyer.onDeepLink(async (res) => {
  console.log('onDeepLinkCanceller DLValue::>', res);
  if (res?.deepLinkStatus !== 'NOT_FOUND') {
    const DLValue = res?.data.deep_link_value;
    await Linking.openURL(DLValue);
  }
});

appsFlyer.initSdk(
  {
    devKey: env.APPSFLYER.DEV_KEY,
    isDebug: false,
    appId: env.APPSFLYER.APP_ID,
    onInstallConversionDataListener: true,
    onDeepLinkListener: true,
    timeToWaitForATTUserAuthorization: 10,
  },
  (result) => {
    console.log('AAPPFLYERS', result);
  },
  (error) => {
    console.log('AAPPFLYERS', error);
  }
);
const maintenanceHandler = async () => {
  const result = await RemoteConfigService.fetchValues();
  const maintenance = result.find(
    (x) => x.key === RemoteConfigKeys.SCREEN_MAINTENANCE
  );

  return maintenance.value;
};

const App = () => {
  const [canRegisterUser, setCanRegisterUser] = useState(true);
  const [userId, setUserId] = useState('06869751110');

  useEffect(() => {
    PushIOManager.configure(
      'pushio_config.json',
      (configureError: any, configureResponse: any) => {
        if (configureResponse === 'success') {
          if (Platform.OS === 'android') {
            PushIOManager.registerApp(
              true,
              (registerError: any, registerResponse: any) => {
                if (registerResponse === 'success') {
                  setCanRegisterUser(true);
                } else {
                  setCanRegisterUser(false);
                }
              }
            );
          } else {
            PushIOManager.registerForAllRemoteNotificationTypes(
              (error: any, response: any) => {
                PushIOManager.registerApp(
                  true,
                  (error: any, response: any) => { }
                );
              }
            );
          }
        } else {
          setCanRegisterUser(false);
        }
      }
    );
  }, []);

  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isOnMaintenance, setIsOnMaintenance] = useState(false);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState<boolean>(null);
  const firstLaunchedData = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData === null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else if (appData === 'true') {
      setIsAppFirstLaunched(true);
    } else {
      setIsAppFirstLaunched(false);
    }
  };

  useEffect(() => {
    firstLaunchedData();
  }, []);

  const getTestEnvironment = async () => {
    const res = await AsyncStorage.getItem('isTesting');

    if (res === 'true') {
      setIsTesting(true);
    } else {
      setIsTesting(false);
    }
  };

  const getMaintenanceValue = async () => {
    const screenMaintenance = await RemoteConfigService.getValue<boolean>(
      'SCREEN_MAINTENANCE'
    );
    setIsOnMaintenance(screenMaintenance);
  };

  useEffect(() => {
    getTestEnvironment();
  }, []);

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
    if (onDeepLinkCanceller) {
      onDeepLinkCanceller();
      onDeepLinkCanceller = null;
    }
  });

  useEffect(() => {
    (async () => {
      await requestTrackingPermission();
    })();
    requestUserPermission();
    logAppOpenAnalytics();
    responsysConfig();
    oneSignalConfig();
    setTimeout(() => {
      getMaintenanceValue();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ConfigContextProvider>
        <StatusBarContextProvider>
          <NavigationContainer linking={linkingConfig} theme={DefaultTheme}>
            {isOnMaintenance ? (
              <Maintenance isVisible />
            ) : (
              <CartContextProvider>
                <AuthContextProvider>
                  <ContentfullContextProvider>
                    <RegionalSearchContextProvider>
                      <CacheImagesProvider>
                        <FirebaseContextProvider>
                          <ChronometerContextProvider>
                            <ApolloProvider
                              client={
                                isTesting
                                  ? apolloClientTesting
                                  : apolloClientProduction
                              }
                            >
                              <InitialScreen>
                                <AppRouting
                                  isFirstLaunched={isAppFirstLaunched}
                                />
                              </InitialScreen>
                            </ApolloProvider>
                          </ChronometerContextProvider>
                        </FirebaseContextProvider>
                      </CacheImagesProvider>
                    </RegionalSearchContextProvider>
                  </ContentfullContextProvider>
                </AuthContextProvider>
              </CartContextProvider>
            )}
          </NavigationContainer>
        </StatusBarContextProvider>
      </ConfigContextProvider>
    </ThemeProvider>
  );
};

// export default App;
export default SentryConfig.wrap(App);
