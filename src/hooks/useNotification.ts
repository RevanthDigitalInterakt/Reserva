import { useEffect, useState } from 'react';
import {
  FirebaseMessagingTypes,
  default as messaging,
} from '@react-native-firebase/messaging';
import { Linking } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

export const useNotification = () => {

  const [channelId, setChannelId] = useState('');
  const [notifications, setNotifications] = useState<
    FirebaseMessagingTypes.RemoteMessage[]
  >([]);
  useEffect(() => {
    const notify = async () => {
      if (notifications.length) {
        for (let i = 0; i < notifications.length; i++) {
          const data = JSON.parse(notifications[i]?.data?.data as string);

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
            await notifee.displayNotification(not);
          }
        }
        setNotifications([]);
      }
    };
    notify();
  }, [notifications]);

  const onMessageReceived = async (message: any) => {
    console.log('message',message);
    
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

  useEffect(() => {
    const handleClickOnNotification = notifee.onForegroundEvent(
      async ({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
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

  return { onMessageReceived };
};