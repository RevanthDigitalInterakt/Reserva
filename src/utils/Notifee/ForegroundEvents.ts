import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle, EventType } from '@notifee/react-native';
import { Linking, Platform } from 'react-native';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import { pushClicked } from '../../services/ditoService';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

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

    if (!remoteMessage?.data?.data) return;

    if (remoteMessage?.data) {
      try {
        const { details, reference, notification } = JSON.parse(remoteMessage?.data?.data || '{}');

        await setItem('@DitoNotification:Id', notification);
        await setItem('@DitoNotification:Ref', reference);

        const link = details?.link || '';
        const title = details?.title || '';
        const body = details?.message || '';
        const bigText = body || ' ';
        const hasLink = link || 'usereserva://home-tabs';

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
        ExceptionProvider.captureException(error, "OnForegroundEventPush - ForegroundEvents.ts");
      }
    }
  });

  // TODO Add subscriber
  notifee.onForegroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS && detail?.notification?.data?.hasLink) {
      const dataLink = detail?.notification?.data?.hasLink;

      await Linking.openURL(dataLink);

      const notificationId = await getItem('@DitoNotification:Id');
      const reference = await getItem('@DitoNotification:Ref');

      if (notificationId && reference) {
        await pushClicked(notificationId, reference);
      }
    }
  });
};

export default OnForegroundEventPush;
