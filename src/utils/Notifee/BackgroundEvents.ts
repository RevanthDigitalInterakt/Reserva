/* eslint-disable react-hooks/rules-of-hooks */
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { Linking, Platform } from 'react-native';
import { pushClicked } from '../../services/ditoService';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

const onBackgroundEventPush = async () => {
  const { setItem, getItem } = useAsyncStorageProvider();

  if (Platform.OS === 'ios') {
    await messaging().requestPermission();
  }

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    if (!remoteMessage?.data?.data) return;

    if (remoteMessage?.data) {
      const { details, reference, notification } = JSON.parse(remoteMessage?.data?.data || '{}');

      await setItem('@DitoNotification:Id', notification);
      await setItem('@DitoNotification:Ref', reference);

      const link = details?.link || '';
      const title = details?.title || '';
      const body = details?.message || '';
      const bigText = body || ' ';
      const hasLink = link || 'usereserva://home-tabs';
      try {
        notifee.displayNotification({
          title,
          body,
          data: { hasLink },
          android: {
            channelId,
            smallIcon: 'ic_stat_onesignal_default',
            color: '#c41010',
            pressAction: {
              id: 'default',
            },
            style: { type: AndroidStyle.BIGTEXT, text: bigText },
          },
          ios: {

          },
        });
      } catch (error) {
        ExceptionProvider.captureException(error, "onBackgroundEventPush - BackgroundEvents.ts");
      }
    }
  });

  notifee.onForegroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail.notification?.data?.hasLink) {
      const dataLink = detail.notification?.data?.hasLink;

      await Linking.openURL(dataLink);

      const notificationId = await getItem('@DitoNotification:Id');
      const reference = await getItem('@DitoNotification:Ref');

      if (notificationId && reference) {
        await pushClicked(notificationId, reference);
      }
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail.notification?.data?.hasLink) {
      const dataLink = detail.notification?.data?.hasLink;

      await Linking.openURL(dataLink);

      const notificationId = await getItem('@DitoNotification:Id');
      const reference = await getItem('@DitoNotification:Ref');

      if (notificationId && reference) {
        await pushClicked(notificationId, reference);
      }
    }
  });
};

export default onBackgroundEventPush;
