import { ApolloProvider } from '@apollo/client';
import remoteConfig from '@react-native-firebase/remote-config';
import { NavigationContainer } from '@react-navigation/native';
import JailMonkey from 'jail-monkey';
import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import DeviceInfo from 'react-native-device-info';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import ReactMoE, { MoEAppStatus } from 'react-native-moengage';
import { OneSignal } from 'react-native-onesignal';
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
import { useRemoteConfig } from './hooks/useRemoteConfig';
import InitialScreen from './InitialScreen';
import ReservaJailbreakScreen from './ReservaJailbreakScreen';
import { AppRouting } from './routes/AppRouting';
import EventProvider from './utils/EventProvider';
import type { EventsOptions } from './utils/EventProvider/Event';
import { navigationRef } from './utils/navigationRef';
import ToastProvider from './utils/Toast';
import { useApolloFetchPolicyStore } from './zustand/useApolloFetchPolicyStore';
import { useBagStore } from './zustand/useBagStore/useBagStore';
import { useHomeStore } from './zustand/useHomeStore';
import { usePageLoadingStore } from './zustand/usePageLoadingStore/usePageLoadingStore';
import { version as CURRENT_VERSION } from '../package.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_VERSION_KEY = 'lastAppVersion';

interface INotificationPayload {
  data: {
    payload: {
      app_extra: {
        moe_deeplink: string;
      };
      screenData: {
        deeplink: string;
      };
    };
  };
  deeplink: string;
  gcm_webUrl: string;
}

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

  const client = useApolloClientHook(false);
  const { onStartLoad } = usePageLoadingStore(['onStartLoad']);
  const { checkIfFirstLaunch, onSelectStateGeolocation } = useHomeStore(['checkIfFirstLaunch', 'onSelectStateGeolocation']);
  const { actions } = useBagStore(['actions']);

  const remoteConfigStore = useRemoteConfig();
  const { setItem, getItem } = useAsyncStorageProvider();

  const firstLaunchedData = async () => {
    await setItem('@RNSession:Ron', false);
    const firstLaunched = await getItem('FIRST_TIME_OPEN');
    const getStateGeolocation = await getItem('User:Geolocation');

    if (getStateGeolocation !== null) {
      onSelectStateGeolocation(getStateGeolocation);
    }

    if (firstLaunched === null) {
      checkIfFirstLaunch(true);
    }
  };

  useEffect(() => {
    (async () => {
      EventProvider.initializeModules();
      firstLaunchedData();
      await actions.INITIAL_LOAD();
      remoteConfigStore.fetchInitialData(remoteConfig());
    })();
  }, []);

  useEffect(() => {

  
    
    const installUpdate=async()=>{
      try{
       const lastVersion = await AsyncStorage.getItem(LAST_VERSION_KEY);
       console.debug("lastVersion",lastVersion);
       console.debug(CURRENT_VERSION);

               if (!lastVersion) {
                  ReactMoE.setAppStatus(MoEAppStatus.Install);
               } else if (lastVersion !== CURRENT_VERSION) {
                ReactMoE.setAppStatus(MoEAppStatus.Update);
                 console.debug("update fired",CURRENT_VERSION);
               }

               await AsyncStorage.setItem(LAST_VERSION_KEY, CURRENT_VERSION);
             } catch (e) {
               console.error('MoEngage version check failed:', e);
             }

        }

    installUpdate();

    const clickListenerOneSignal = async (event) => {
      const deeplink = event.notification.launchURL || event.result.url || '';
      if (deeplink) {
        await Linking.openURL(deeplink);
      }
    };

    const pushClickedListenerMoEngage = async (notificationPayload) => {
      let deeplink = '';
      if (Platform.OS === 'ios') {
        deeplink = notificationPayload?.data?.payload?.app_extra?.moe_deeplink
          || notificationPayload?.data?.payload?.screenData?.deeplink;
      } else {
        deeplink = notificationPayload?.deeplink || notificationPayload?.gcm_webUrl;
      }
      if (deeplink) {
        await Linking.openURL(deeplink);
      }
    };

    OneSignal.Notifications.addEventListener('click', clickListenerOneSignal);
    ReactMoE.setEventListener('pushClicked', pushClickedListenerMoEngage);
    ReactMoE.initialize('DQ9WFLTADL2Y89Z9OSFUKU0L');
    ReactMoE.requestPushPermissionAndroid();
    ReactMoE.registerForPush();
    ReactMoE.enableAdIdTracking();

    return () => {
      ReactMoE.removeEventListener('pushClicked');
      OneSignal.Notifications.removeEventListener('click', clickListenerOneSignal);
    };
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
