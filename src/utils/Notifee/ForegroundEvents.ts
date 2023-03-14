import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { Linking } from 'react-native';
import EventProvider from '../EventProvider';

const OnForegroundEventPush = async () => {
  await messaging().requestPermission();

  // TODO Add subscriber
  messaging().onMessage(async (remoteMessage) => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    if (remoteMessage.data) {
      const { details } = JSON.parse(remoteMessage?.data?.data ?? '');
      const { link } = details;
      const title = details?.message.split('\n')[0];
      const body = details?.message.split('\n')[1];
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
      const dataLink = detail.notification?.data?.hasLink as string;
      // TODO Add await
      Linking.openURL(dataLink);
    }
  });
};

export default OnForegroundEventPush;
