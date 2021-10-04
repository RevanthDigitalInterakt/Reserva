import { Alert } from 'react-native';
import OneSignal from 'react-native-onesignal';

import { env } from '../env';

export const oneSignalConfig = async () => {
  /* O N E S I G N A L   S E T U P */
  if (__DEV__) {
    OneSignal.setLogLevel(6, 0);
  }

  console.log(OneSignal.getDeviceState());

  OneSignal.setAppId(env.ONE_SIGINAL_APP_KEY_IOS);

  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log('Prompt response:', response);
  });
  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent
      );
      const notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
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
      //   Alert.alert("Complete notification?", "Test", [button1, button2], {
      //     cancelable: true,
      //   });
    }
  );

  OneSignal.setNotificationOpenedHandler((notification) => {
    // Alert.alert(
    //   "OneSignal: notification opened:",
    //   JSON.stringify(notification)
    // );
    console.log('OneSignal: notification opened:', notification);
  });
  const deviceState = await OneSignal.getDeviceState();

  console.log(deviceState);

  //   if (setIsSubscribed) {
  //     setIsSubscribed(deviceState.isSubscribed);
  //   }

  //   this.setState({
  //     isSubscribed: deviceState.isSubscribed,
  //   });
};
