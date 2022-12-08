import checkVersion from 'react-native-store-version';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';
import Config from 'react-native-config';


export const haveVersionUpdates = async () => {
  try {
    const { remote, local } = await checkVersion({
      version: DeviceInfo.getVersion(),
      iosStoreURL: Config.IOS_STORE_URL,
      androidStoreURL: Config.ANDROID_STORE_URL,
      country: 'BR',
    });
    const inAppUpdates = new SpInAppUpdates(false);

    const response = await inAppUpdates.checkNeedsUpdate({
      curVersion: local,
      customVersionComparator: () => {
        return remote > local ? 1 : -1;
      },
    });
    if (response.shouldUpdate) {
      inAppUpdates.addStatusUpdateListener();
    }
    return response.shouldUpdate;
  } catch (error) {
    Sentry.captureException(error);
  }
};
