import React, { FC, useEffect } from 'react';

import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { StatusBar, Platform, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { StorageService } from './shared/services/StorageService';
import Modal from "react-native-modal";
import { Box, Typography } from 'reserva-ui';

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
  const setFetchInterval = async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000,
      fetchTimeMillis: 30000,
    });
  };

  const hasMessage = () => {
    // if (remoteMessage) {
    //   setShowModal(true)
    // }
    return (
      <Box>
        <Modal isVisible={false}>
          <Box bg="white">
            <Typography>remoteMessage.notification?.title</Typography>
          </Box>
        </Modal>
      </Box>
    )
  }
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
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // hasMessage(JSON.stringify(remoteMessage))
      // if (remoteMessage) {
      //   notifee.displayNotification(JSON.stringify(remoteMessage));
      // }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        {hasMessage()}
        <Animatable.View animation="fadeIn" style={{ height: '100%' }}>
          {children}
        </Animatable.View>
      </SafeAreaView>
    </>
  );
};

export default InitialScreen;
