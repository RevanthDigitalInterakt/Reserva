import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

type MultiGetOptions = {
  key: StorageServiceKeys;
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
  getItem: (key: string): Promise<any> =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            resolve(value);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }),
  setItem: (key: string, value: string) =>
    new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  getJSON: (key: string): Promise<any> =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            resolve(JSON.parse(value));
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }),
  setJSON: (key: string, value: any): Promise<any> =>
    new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, JSON.stringify(value))
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  multiGet: <T>(options: MultiGetOptions[]): MultiGetReturn<T> => {
    const promises = options.map((option: MultiGetOptions) =>
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
