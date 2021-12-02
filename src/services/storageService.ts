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

export const StorageService = {
  generateInstallationToken: () => {
    const token = uuid.v4();
    AsyncStorage.setItem(StorageServiceKeys.INSTALLATION_TOKEN, String(token));
  },
  getInstallationKey: () =>
    AsyncStorage.getItem(StorageServiceKeys.INSTALLATION_TOKEN),
  getItem: ({ key, isJSON }: GetSetOptions): Promise<any> =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            resolve(isJSON ? JSON.parse(value) : value);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }),
  setItem: ({ key, value, isJSON }: GetSetOptions) =>
    new Promise((resolve, reject) => {
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
    }),
  multiGet: <T>(options: GetSetOptions[]): MultiGetReturn<T> => {
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
  },
};
