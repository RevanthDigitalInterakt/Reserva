import remoteConfig from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';

type RemoteConfigReturn<T> = {
  production: T;
  staging: T;
};

export class RemoteConfigService {
  static excludedKeys: string[] = [
    'cashback_in_store',
    'balance_cashback_in_app',
    'sale_off_tag',
    'appName',
    'appVersion',
  ];

  static async getValue<T>(key: string): Promise<T> {
    const value = await remoteConfig().getValue(key);
    const valueParsed: RemoteConfigReturn<T> = JSON.parse(value.asString());

    if (this.isInStaging()) {
      return valueParsed.staging;
    }
    return valueParsed.production;
  }

  static async fetchValues(): Promise<any[]> {
    const value = await remoteConfig().getAll();
    const returnValue: any[] = [];
    Object.keys(value).forEach((key) => {
      if (this.excludedKeys.indexOf(key) === -1) {
        const valueJSON = JSON.parse(value[key].asString());

        if (this.isInStaging()) {
          returnValue.push({
            key,
            value: valueJSON.staging,
          });
        } else {
          returnValue.push({
            key,
            value: valueJSON.production,
          });
        }
      }
    });

    return returnValue;
  }

  static isInStaging(): boolean {
    const value = remoteConfig().getValue('VERSION_IN_PRODUCTION');
    const versionName = DeviceInfo.getVersion();

    if (value.asString() === versionName) {
      return false;
    }
    return true;
  }
}
