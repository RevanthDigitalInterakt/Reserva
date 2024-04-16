import { useCallback, useEffect, useState } from 'react';
import {
  FirebaseMessagingTypes,
  default as messaging,
} from '@react-native-firebase/messaging';
import { Linking } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { ditoAPI } from '../utils/Notifee/ditoApi';
import type { UserData } from '../utils/Notifee/ditoApi'

const initialUser = {
  id: '',
  name: '',
  email: '',
  location: '',
  token: '',
}

export const useNotification = () => {
  const [userData, setUserData] = useState<UserData>(initialUser);



  const [channelId, setChannelId] = useState('');
  const [notifications, setNotifications] = useState<
    FirebaseMessagingTypes.RemoteMessage[]
  >([]);


  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log('enabled', enabled)
    if (enabled) {
      await ditoAPI.updateUserData({
        userData: { ...userData, custom_Data: { enablePush: 'true' } },
      });
    }
  }, []);

  const onAppBootstrap = useCallback(async () => {
    await requestUserPermission();
    await messaging().registerDeviceForRemoteMessages();
    const t = await messaging().getToken();
    console.log('userData', userData);
    setUserData({ ...userData, token: t });
  }, []);


  useEffect(() => {
    onAppBootstrap();
  }, [onAppBootstrap]);

  useEffect(() => {
    const notify = async () => {
      const channel = await notifee.getChannel(channelId);
console.log('channelchannel',channel)
      if (notifications.length) {
        console.log('notifications', notifications)
        for (let i = 0; i < notifications.length; i++) {
          const data = JSON.parse(notifications[i]?.data?.data as string);
          console.log('datadata', data)

          const details = data.details;

          if (details?.title && details?.message) {
            const not = {
              title: String(details.title),
              body: String(details.message),
              android: {
                channelId,
                importance: AndroidImportance.HIGH,
              },
              data: {
                notification:
                  String(data.notification),
                reference: String(data.reference),
                link: String(details.link),
              },
            };
            console.log('not', not)
            await notifee.displayNotification(not);
          }
        }
        setNotifications([]);
      }
    };
    notify();
  }, [notifications]);

  const onMessageReceived = async (message: any) => {
    const hasNotifiedBefore = notifications.find(
      notification =>
        (notification?.data?.details as any)?.notification ===
        (message.data?.details as any)?.notification,
    );

    if (!hasNotifiedBefore) {
      setNotifications(prev => [...prev, message]);
    }
  };


  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    notifee.onBackgroundEvent(() => true);

    const createChannel = async () => {
      setChannelId(
        await notifee.createChannel({
          id: 'DITO',
          name: 'Dito Notification',
          importance: AndroidImportance.HIGH,
        }),
      );
    };

    createChannel();

    return unsubscribe;
  }, []);

  const OnForegroundEventPush = async (notification: string, reference: string) => {
    await ditoAPI.openNotification({
      notificationId: notification,
      reference: reference,
      userData,
    });
  };

  useEffect(() => {
    const handleClickOnNotification = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            const link = String(detail.notification?.data?.link);

            if (!link) {
              break;
            }

            try {
              await Linking.openURL(link);
            } catch (error) {
              console.error(error);
            }

            break;
        }
      },
    );

    return handleClickOnNotification;
  }, []);

  return { userData, setUserData, onMessageReceived };
};