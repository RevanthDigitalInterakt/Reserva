import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { ThemeProvider } from 'styled-components/native';
import remoteConfig from '@react-native-firebase/remote-config';
import { linkingConfig } from './config/linking';
import CartContextProvider from './context/CartContext';
import ChronometerContextProvider from './context/ChronometerContext';
import ContentfullContextProvider from './context/ContentfullContext';
import { FirebaseContextProvider } from './context/FirebaseContext';
import RegionalSearchContextProvider from './context/RegionalSearchContext';
import StatusBarContextProvider from './context/StatusBarContext';
import useAsyncStorageProvider from './hooks/useAsyncStorageProvider';
import InitialScreen from './InitialScreen';
import { AppRouting } from './routes/AppRouting';
import EventProvider from './utils/EventProvider';
import ToastProvider from './utils/Toast';
import { useRemoteConfig } from './hooks/useRemoteConfig';
import useApolloClientHook from './hooks/useApolloClientHook';
import { useApolloFetchPolicyStore } from './zustand/useApolloFetchPolicyStore';
import { navigationRef } from './utils/navigationRef';
import { theme } from './base/usereservappLegacy/theme';
import { ExceptionProvider } from './base/providers/ExceptionProvider';
import sentryConfig from './config/sentryConfig';
import DatadogComponentProvider from './components/DatadogComponentProvider';
import { usePageLoadingStore } from './zustand/usePageLoadingStore/usePageLoadingStore';
import { useConnectivityStore } from './zustand/useConnectivityStore';
import { useBagStore } from './zustand/useBagStore/useBagStore';

const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

function App() {
  useApolloFetchPolicyStore(['initialized']);

  const { onListenEvents: onListenConnectivityEvents } = useConnectivityStore(['onListenEvents']);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const client = useApolloClientHook(isTesting);
  const { onStartLoad } = usePageLoadingStore(['onStartLoad']);
  const { actions } = useBagStore(['actions']);

  const remoteConfigStore = useRemoteConfig();
  const { setItem } = useAsyncStorageProvider();

  const firstLaunchedData = async () => {
    await setItem('@RNSession:Ron', false);
  };

  useEffect(() => {
    firstLaunchedData();

    onListenConnectivityEvents();
    remoteConfigStore.fetchInitialData(remoteConfig());
  }, []);

  const getTestEnvironment = useCallback(async () => {
    const res = await AsyncStorage.getItem('isTesting');

    setIsTesting(res === 'true');
  }, []);

  useEffect(() => {
    getTestEnvironment();
  }, [getTestEnvironment]);

  useEffect(() => {
    (async () => {
      await requestTrackingPermission();
    })();

    EventProvider.initializeModules();
  }, []);

  return (
    <DatadogComponentProvider>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <StatusBarContextProvider>
            <NavigationContainer
              linking={linkingConfig}
              theme={DefaultTheme}
              onReady={async () => {
                ExceptionProvider.trackScreen();
                RNBootSplash.hide();
                onStartLoad(navigationRef.current?.getCurrentRoute()?.name);
                await actions.ROULET_COUPON_INITIAL_LOAD();
              }}
              ref={navigationRef}
              onStateChange={() => {
                ExceptionProvider.trackScreen();

                const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
                onStartLoad(currentRouteName);
              }}
            >
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
            </NavigationContainer>
          </StatusBarContextProvider>
          <ToastProvider />
        </ApolloProvider>
      </ThemeProvider>
    </DatadogComponentProvider>
  );
}

export default sentryConfig.wrap(App);
