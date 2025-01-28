import { PermissionsAndroid, Platform } from 'react-native';
import { platformType } from '../../../../../utils/platformType';
import { ExceptionProvider } from '../../../../../base/providers/ExceptionProvider';

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
    ExceptionProvider.captureException(err, "requestCameraPermission - ModalChangeFile");
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
    ExceptionProvider.captureException(err, "requestExternalWritePermission - ModalChangeFile");
  }

  return false;
};

export { requestExternalWritePermission, requestCameraPermission };
