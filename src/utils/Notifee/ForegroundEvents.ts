import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { Linking, Platform } from 'react-native';
import EventProvider from '../EventProvider';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import { pushClicked } from '../../services/ditoService';

const OnForegroundEventPush = async () => {
  const { setItem, getItem } = useAsyncStorageProvider();

  if (Platform.OS === 'ios') {
    await messaging().requestPermission();
  }

  // TODO Add subscribe
  messaging().onMessage(async (remoteMessage) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    if (remoteMessage.data) {
      const { details, reference, notification } = JSON.parse(remoteMessage?.data?.data || '{}');

      await setItem('@DitoNotification:Id', notification);
      await setItem('@DitoNotification:Ref', reference);

      const link = details?.link || '';
      const title = details?.message.split('\n')[0] || '';
      const body = details?.message.split('\n')[1] || '';
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
        EventProvider.sentry.captureException(error);
      }
    }
  });

  // TODO Add subscriber
  notifee.onForegroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail.notification?.data?.hasLink) {
      const dataLink = detail.notification?.data?.hasLink;

      Linking.openURL(dataLink);

      const notificationId = await getItem('@DitoNotification:Id');
      const reference = await getItem('@DitoNotification:Ref');

      if (notificationId && reference) {
        await pushClicked(notificationId, reference);
      }
    }
  });
};

export default OnForegroundEventPush;
