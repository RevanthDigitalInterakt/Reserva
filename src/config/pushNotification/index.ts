import { Alert } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { StoreUpdatePush } from '../../modules/Update/pages/StoreUpdatePush';
import { requestATT } from '../../modules/Onboarding/components/Permissions';
import { env } from '../env';

export const oneSignalConfig = async () => {
  /* O N E S I G N A L   S E T U P */
  if (__DEV__) {
    OneSignal.setLogLevel(6, 0);
  }

  OneSignal.setAppId(env.ONE_SIGINAL_APP_KEY_IOS);

  OneSignal.promptForPushNotificationsWithUserResponse((response) => {});

  OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      const notification = notificationReceivedEvent.getNotification();

      const data = notification.additionalData;

      const button1 = {
        text: 'Cancel',
        onPress: () => {
          notificationReceivedEvent.complete();
        },
        style: 'cancel',
      };
      const button2 = {
        text: 'Complete',
        onPress: () => {
          notificationReceivedEvent.complete(notification);
        },
      };
    }
  );

  OneSignal.setNotificationOpenedHandler((notification) => {
    if (notification.notification.launchURL === 'usereserva://storeUpdate') {
      StoreUpdatePush();
    }
  });
  const deviceState = await OneSignal.getDeviceState();
};
