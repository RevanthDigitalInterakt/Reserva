import { ApolloProvider } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { NavigationContainer } from '@react-navigation/native';
import JailMonkey from 'jail-monkey';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import DeviceInfo from 'react-native-device-info';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { ExceptionProvider } from './base/providers/ExceptionProvider';
import { theme } from './base/usereservappLegacy/theme';
import DatadogComponentProvider from './components/DatadogComponentProvider';
import { linkingConfig } from './config/linking';
import ChronometerContextProvider from './context/ChronometerContext';
import ContentfullContextProvider from './context/ContentfullContext';
import { FirebaseContextProvider } from './context/FirebaseContext';
import RegionalSearchContextProvider from './context/RegionalSearchContext';
import StatusBarContextProvider from './context/StatusBarContext';
import useApolloClientHook from './hooks/useApolloClientHook';
import useAsyncStorageProvider from './hooks/useAsyncStorageProvider';
import { useNotification } from './hooks/useNotification';
import { useRemoteConfig } from './hooks/useRemoteConfig';
import InitialScreen from './InitialScreen';
import ReservaJailbreakScreen from './ReservaJailbreakScreen';
import { AppRouting } from './routes/AppRouting';
import { getDeviceInfoMemory, getDeviceInfoModel, getDeviceInfoStorage } from './utils/Device/deviceUtils';
import EventProvider from './utils/EventProvider';
import type { EventsOptions } from './utils/EventProvider/Event';
import { navigationRef } from './utils/navigationRef';
import ToastProvider from './utils/Toast';
import { useApolloFetchPolicyStore } from './zustand/useApolloFetchPolicyStore';
import { useBagStore } from './zustand/useBagStore/useBagStore';
import { useConnectivityStore } from './zustand/useConnectivityStore';
import { usePageLoadingStore } from './zustand/usePageLoadingStore/usePageLoadingStore';
import UxCam from './utils/UxCam';

const { model, os } = getDeviceInfoModel();
const { freeMemory, totalMemory, usedMemory } = getDeviceInfoMemory();
const { freeStorage, totalStorage, usedStorage } = getDeviceInfoStorage();

const DefaultTheme = {
  colors: {
    background: theme.colors.backgroundApp,
  },
};

const isJailBroken = JailMonkey.isJailBroken();

if (isJailBroken) {
  const deviceProperties: EventsOptions.MobileJailbroken = {
    platform: Platform.OS,
    model: DeviceInfo.getModel(),
    ip: DeviceInfo.getIpAddressSync(),
  };

  EventProvider.logEvent('mobile_jailbroken', deviceProperties);
}

function App() {
  useApolloFetchPolicyStore(['initialized']);
  useNotification();

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

  if (Platform.OS === 'ios') {
    messaging().requestPermission();
  }

  useEffect(() => {
    (async () => {
      firstLaunchedData();
      await actions.INITIAL_LOAD();
      onListenConnectivityEvents();
      remoteConfigStore.fetchInitialData(remoteConfig());
    })();
  }, []);

  const getTestEnvironment = useCallback(async () => {
    const res = await AsyncStorage.getItem('isTesting');

    setIsTesting(res === 'true');
  }, []);

  useEffect(() => {
    getTestEnvironment();
  }, [getTestEnvironment]);

  useEffect(() => {
    EventProvider.initializeModules();

    EventProvider.logEvent('device_info_memory', {
      model,
      os,
      totalMemory,
      freeMemory,
      usedMemory,
    });

    EventProvider.logEvent('device_info_storage', {
      model,
      os,
      totalStorage,
      freeStorage,
      usedStorage,
    });

    UxCam.initializeModule();
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
                setTimeout(() => {
                  RNBootSplash.hide();
                }, 2000);
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
              <ContentfullContextProvider>
                <RegionalSearchContextProvider>
                  <FirebaseContextProvider>
                    <ChronometerContextProvider>
                      {(isJailBroken)
                        ? (<ReservaJailbreakScreen />)
                        : (
                          <InitialScreen>
                            <AppRouting />
                          </InitialScreen>
                        )}
                    </ChronometerContextProvider>
                  </FirebaseContextProvider>
                </RegionalSearchContextProvider>
              </ContentfullContextProvider>
            </NavigationContainer>
          </StatusBarContextProvider>
          <ToastProvider />
        </ApolloProvider>
      </ThemeProvider>
    </DatadogComponentProvider>
  );
}

export default App;
