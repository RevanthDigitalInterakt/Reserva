import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

type GetSetOptions = {
  key: StorageServiceKeys;
  value?: string;
  isJSON?: boolean;
};

type MultiGetReturn<T> = Promise<T>;

export enum StorageServiceKeys {
  INSTALLATION_TOKEN = 'installationToken',
  PROFILE = 'profile',
}

export class StorageService {
  static async getInstallationToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(StorageServiceKeys.INSTALLATION_TOKEN)
        .then((value) => {
          if (value) {
            resolve(value);
          } else {
            reject(new Error('No installation token'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async setInstallationToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const installationToken = uuid.v4() as string;

      AsyncStorage.setItem(
        StorageServiceKeys.INSTALLATION_TOKEN,
        installationToken
      )
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getItem<T>({ key, isJSON }: GetSetOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            resolve(isJSON ? JSON.parse(value) : value);
          } else {
            reject(new Error('No value'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async setItem({
    key,
    value,
    isJSON,
  }: GetSetOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (value) {
        AsyncStorage.setItem(key, isJSON ? JSON.stringify(value) : value)
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('Value is required'));
      }
    });
  }

  static async multiGet<T>(options: GetSetOptions[]): MultiGetReturn<T> {
    const promises = options.map((option: GetSetOptions) =>
      AsyncStorage.getItem(option.key)
    );
    const processResult = (result: any) => {
      const resultObj: any = {};
      result.map((value: string, i: number) => {
        if (options[i].isJSON) {
          resultObj[options[i].key] = JSON.parse(value);
        } else {
          resultObj[options[i].key] = value;
        }
        return true;
      });
      return resultObj;
    };

    return Promise.all(promises).then(
      (result) => {
        const value = processResult(result);
        return Promise.resolve(value);
      },
      (errors) => Promise.reject(errors)
    );
  }
}
