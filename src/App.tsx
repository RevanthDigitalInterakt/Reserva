import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import AsyncStorage from '@react-native-community/async-storage';
import { linkingConfig } from './config/linking';
import AuthContextProvider from './context/AuthContext';
import { CacheImagesProvider } from './context/CacheImagesContext';
import ChronometerContextProvider from './context/ChronometerContext';
import CartContextProvider from './context/CartContext';
import { FirebaseContextProvider } from './context/FirebaseContext';
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
import StatusBarContextProvider from './context/StatusBarContext';
import ConfigContextProvider from './context/ConfigContext';
import SentryConfig from './config/sentryConfig';
import { IS_DEV } from './utils/enviromentUtils';
import EventProvider from './utils/EventProvider';
import ToastProvider from './utils/Toast';
import useAsyncStorageProvider from './hooks/useAsyncStorageProvider';

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
                                isTesting || IS_DEV
                                  ? apolloClientTesting
                                  : apolloClientProduction
                              }
                            >
                              <InitialScreen>
                                <AppRouting />
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
      <ToastProvider />
    </ThemeProvider>
  );
};

export default SentryConfig.wrap(App);
