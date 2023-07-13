import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '@usereservaapp/reserva-ui';
import React, { useCallback, useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { ThemeProvider } from 'styled-components/native';
import remoteConfig from '@react-native-firebase/remote-config';
import { linkingConfig } from './config/linking';
import SentryConfig from './config/sentryConfig';
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
import { RemoteConfigService } from './shared/services/RemoteConfigService';
import EventProvider from './utils/EventProvider';
import ToastProvider from './utils/Toast';
import { useRemoteConfig } from './hooks/useRemoteConfig';
import useApolloClientHook from './hooks/useApolloClientHook';
import { useApolloFetchPolicyStore } from './zustand/useApolloFetchPolicyStore';
import { navigationRef } from './utils/navigationRef';

const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

const App = () =>
{
  useApolloFetchPolicyStore(['initialized']);

  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isOnMaintenance, setIsOnMaintenance] = useState(false);
  const client = useApolloClientHook(isTesting);

  const remoteConfigStore = useRemoteConfig();
  const { setItem } = useAsyncStorageProvider();

  const firstLaunchedData = async () =>
  {
    await setItem('@RNSession:Ron', false);
  };

  useEffect(() =>
  {
    firstLaunchedData();

    remoteConfigStore.fetchInitialData(remoteConfig());
  }, []);

  const getTestEnvironment = useCallback(async () =>
  {
    const res = await AsyncStorage.getItem('isTesting');

    setIsTesting(res === 'true');
  }, []);

  const trackScreenViewOnSentry = useCallback(() =>
  {
    EventProvider.trackScreen(navigationRef?.current?.getCurrentRoute());
  }, []);

  const getMaintenanceValue = async () =>
  {
    const screenMaintenance = await RemoteConfigService.getValue<boolean>(
      'SCREEN_MAINTENANCE',
    );
    setIsOnMaintenance(screenMaintenance);
  };

  useEffect(() =>
  {
    getTestEnvironment();
  }, [getTestEnvironment]);

  useEffect(() =>
  {
    (async () =>
    {
      await requestTrackingPermission();
    })();

    EventProvider.initializeModules();

    setTimeout(() =>
    {
      getMaintenanceValue();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <ConfigContextProvider>
          <StatusBarContextProvider>
            <NavigationContainer
              linking={linkingConfig}
              theme={DefaultTheme}
              onReady={() =>
              {
                trackScreenViewOnSentry();
                RNBootSplash.hide();
              }}
              ref={navigationRef}
              onStateChange={trackScreenViewOnSentry}
            >
              {isOnMaintenance ? (
                <Maintenance isVisible />
              ) : (
                <CartContextProvider>
                  <ContentfullContextProvider>
                    <RegionalSearchContextProvider>
                      <FirebaseContextProvider>
                        <ChronometerContextProvider>
                          <InitialScreen>
                            <AppRouting />
                          </InitialScreen>
                        </ChronometerContextProvider>
                      </FirebaseContextProvider>
                    </RegionalSearchContextProvider>
                  </ContentfullContextProvider>
                </CartContextProvider>
              )}
            </NavigationContainer>
          </StatusBarContextProvider>
        </ConfigContextProvider>
        <ToastProvider />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default SentryConfig.wrap(App);
