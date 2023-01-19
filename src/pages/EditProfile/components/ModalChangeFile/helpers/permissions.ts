import { PermissionsAndroid, Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { platformType } from '../../../../../utils/platformType';

const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== platformType.ANDROID) return true;

  try {
    return (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA!,
      {
        title: 'Camera Permission',
        message: 'App needs camera permission',
        buttonPositive: 'Confirm',
      },
    )) === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    Sentry.captureException(err);
  }

  return false;
};

const requestExternalWritePermission = async (): Promise<boolean> => {
  if (Platform.OS !== platformType.ANDROID) return true;

  try {
    return (await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE!,
      {
        title: 'External Storage Write Permission',
        message: 'App needs write permission',
        buttonPositive: 'Confirm',
      },
    )) === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    Sentry.captureException(err);
  }

  return false;
};

export { requestExternalWritePermission, requestCameraPermission };
