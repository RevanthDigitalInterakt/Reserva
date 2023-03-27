import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '@usereservaapp/reserva-ui';
import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { ThemeProvider } from 'styled-components/native';
import { linkingConfig } from './config/linking';
import SentryConfig from './config/sentryConfig';
import AuthContextProvider from './context/AuthContext';
import { CacheImagesProvider } from './context/CacheImagesContext';
import CartContextProvider from './context/CartContext';
import ChronometerContextProvider from './context/ChronometerContext';
import ConfigContextProvider from './context/ConfigContext';
import ContentfullContextProvider from './context/ContentfullContext';
import { FirebaseContextProvider } from './context/FirebaseContext';
import RegionalSearchContextProvider from './context/RegionalSearchContext';
import StatusBarContextProvider from './context/StatusBarContext';
import useAsyncStorageProvider from './hooks/useAsyncStorageProvider';
import InitialScreen from './InitialScreen';
import { Maintenance } from './modules/Home/pages/Maintenance';
import { AppRouting } from './routes/AppRouting';
import {
  apolloClientProduction,
  apolloClientTesting,
} from './services/apolloClient';
import { RemoteConfigService } from './shared/services/RemoteConfigService';
import { IS_DEV } from './utils/enviromentUtils';
import EventProvider from './utils/EventProvider';
import ToastProvider from './utils/Toast';

const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

const requestUserPermission = async () => { };

const App = () => {
  const { setItem } = useAsyncStorageProvider();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isOnMaintenance, setIsOnMaintenance] = useState(false);

  const firstLaunchedData = async () => {
    await setItem('@RNSession:Ron', false);

    const appData = await AsyncStorage.getItem('isAppFirstLaunched');

    if (appData === null) {
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
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
      'SCREEN_MAINTENANCE',
    );
    setIsOnMaintenance(screenMaintenance);
  };

  useEffect(() => {
    getTestEnvironment();
  }, []);

  useEffect(() => {
    (async () => {
      await requestTrackingPermission();
    })();

    requestUserPermission();

    EventProvider.initializeModules();

    setTimeout(() => {
      getMaintenanceValue();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ConfigContextProvider>
        <StatusBarContextProvider>
          <NavigationContainer
            linking={linkingConfig}
            theme={DefaultTheme}
            onReady={() => RNBootSplash.hide()}
          >
            {isOnMaintenance ? (
              <Maintenance isVisible />
            ) : (
              <ApolloProvider
                client={
                  isTesting || IS_DEV
                    ? apolloClientTesting
                    : apolloClientProduction
                }
              >
                <CartContextProvider>
                  <AuthContextProvider>
                    <ContentfullContextProvider>
                      <RegionalSearchContextProvider>
                        <CacheImagesProvider>
                          <FirebaseContextProvider>
                            <ChronometerContextProvider>
                              <InitialScreen>
                                <AppRouting />
                              </InitialScreen>
                            </ChronometerContextProvider>
                          </FirebaseContextProvider>
                        </CacheImagesProvider>
                      </RegionalSearchContextProvider>
                    </ContentfullContextProvider>
                  </AuthContextProvider>
                </CartContextProvider>
              </ApolloProvider>
            )}
          </NavigationContainer>
        </StatusBarContextProvider>
      </ConfigContextProvider>
      <ToastProvider />
    </ThemeProvider>
  );
};

export default SentryConfig.wrap(App);
