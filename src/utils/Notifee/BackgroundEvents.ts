import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { Linking } from 'react-native';
import EventProvider from '../EventProvider';

const onBackgroundEventPush = () => {
  async function onMessageReceived(message: any) {
    if (message.data) {
      const { details } = JSON.parse(message?.data?.data);

      const { link } = details;
      const title = details?.message.split('\n')[0];
      const body = details?.message.split('\n')[1];
      const bigText = body || ' ';
      const hasLink = link || 'usereserva://home-tabs';
      try {
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        notifee.displayNotification({
          title,
          body,
          data: { hasLink },
          android: {
            channelId,
            smallIcon: 'ic_stat_onesignal_default',
            color: '#c41010',
            pressAction: {
              id: 'onOpenApp',
            },
            style: { type: AndroidStyle.BIGTEXT, text: bigText },
          },
        });
      } catch (error) {
        EventProvider.sentry.captureException(error);
      }
      // TODO Add subscriber
      notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification } = detail;

        if (notification) {
          if (type === EventType.PRESS && detail.notification?.data?.hasLink) {
            const dataLink = detail.notification?.data?.hasLink as string;
            // TODO Add await
            Linking.openURL(dataLink);
          }
        }
      });
    }
  }

  messaging().setBackgroundMessageHandler(onMessageReceived);
};

export default onBackgroundEventPush;
