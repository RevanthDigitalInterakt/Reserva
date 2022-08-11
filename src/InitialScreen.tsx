import React, { FC, useEffect, useState } from 'react';

import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { StatusBar, Platform, Alert, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-lottie-splash-screen';

import { StorageService } from './shared/services/StorageService';

import { ModalPush } from './modules/Update/components/ModalPush';
import { StoreUpdatePush } from './modules/Update/pages/StoreUpdatePush';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  await messaging()
    .getToken()
    .then((token) => {
      console.log('token', token);
    });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const InitialScreen: React.FC<{ children: FC }> = ({ children }) => {
  const [pushNotification, setPushNotification] = useState<any>();
  const [showNotification, setShowNotification] = useState(false);
  const setFetchInterval = async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000,
      fetchTimeMillis: 30000,
    });
  };
  useEffect(() => {
    requestUserPermission();
    remoteConfig().setDefaults({
      appName: 'My App',
      appVersion: '1.0.0',
    });
    remoteConfig()
      .fetchAndActivate()
      .then(() => {
        console.log('Remote Config fetched');
      });
    setFetchInterval();
    StorageService.setInstallationToken();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.link === 'usereserva://storeUpdate') {
        setPushNotification(remoteMessage);
        setShowNotification(true);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        {showNotification && (
          <ModalPush
            closeModal={() => setShowNotification(false)}
            data={pushNotification}
            handleNavigation={() => {
              StoreUpdatePush();
              setShowNotification(false);
            }}
          />
        )}
        <Animatable.View animation="fadeIn" style={{ height: '100%' }}>
          {children}
        </Animatable.View>
      </SafeAreaView>
    </>
  );
};

export default InitialScreen;
