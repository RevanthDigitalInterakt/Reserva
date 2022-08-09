import PushIOManager from '@oracle/react-native-pushiomanager';
import { Platform } from 'react-native';

export const responsysConfig = async () => {
  PushIOManager.configure(
    './pushio_config.json',
    (error: any, response: any) => {}
  );
  if (Platform.OS === 'android') {
    PushIOManager.registerApp(true, (error: any, response: any) => {});
  } else {
    PushIOManager.registerForAllRemoteNotificationTypes(
      (error: any, response: any) => {
        PushIOManager.registerApp(true, (error: any, response: any) => {});
      }
    );
  }
};
