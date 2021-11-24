import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

type MultiGetOptions = {
  key: StorageServiceKeys;
  isJSON?: boolean;
};

type MultiGetParamReturn<T> = {
  name: string;
  value: T;
};
type MultiGetReturn<T> = Promise<MultiGetParamReturn<T>>;

export enum StorageServiceKeys {
  INSTALLATION_TOKEN = 'installationToken',
  PROFILE = 'profile',
}

export const StorageService = {
  storageKeys: {
    INSTALLATION_TOKEN: 'installationToken',
    PROFILE: 'profile',
  },
  generateInstallationToken: () => {
    const token = uuid.v4();
    AsyncStorage.setItem(
      StorageService.storageKeys.INSTALLATION_TOKEN,
      String(token)
    );
  },
  getInstallationKey: () =>
    AsyncStorage.getItem(StorageService.storageKeys.INSTALLATION_TOKEN),
  getItem: (key: string): Promise<string | undefined> =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            console.log(
              `StorageService: Value of storage ${key} = ${value.toString()}...`
            );
            resolve(value);
          } else {
            console.log(`StorageService: No value for storage key: ${key}`);
            resolve(null);
          }
        })
        .catch((error) => {
          console.log(
            `StorageService: Error on retrieve value for storage key: ${key}`
          );
          reject(error);
        });
    }),
  setItem: (key: string, value: string) =>
    new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value)
        .then(() => {
          console.log(
            `StorageService: Value of storage ${key} = ${value.toString()}...`
          );
          resolve(true);
        })
        .catch((error) => {
          console.log(
            `StorageService: Error on set value for storage key: ${key}`
          );
          reject(error);
        });
    }),
  getJSON: (key: string): Promise<any> =>
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            console.log(
              `StorageService: Value of storage ${key} = ${value.toString()}...`
            );
            resolve(JSON.parse(value));
          } else {
            console.log(`StorageService: No value for storage key: ${key}`);
            resolve(null);
          }
        })
        .catch((error) => {
          console.log(
            `StorageService: Error on retrieve value for storage key: ${key}`
          );
          reject(error);
        });
    }),
  setJSON: (key: string, value: any): Promise<any> =>
    new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, JSON.stringify(value))
        .then(() => {
          console.log(
            `StorageService: Value of storage ${key} = ${value.toString()}...`
          );
          resolve(true);
        })
        .catch((error) => {
          console.log(
            `StorageService: Error on set value for storage key: ${key}`
          );
          reject(error);
        });
    }),
  multiGet: <T>(options: MultiGetOptions[]): MultiGetReturn<T> => {
    const promises = options.map((option: MultiGetOptions) =>
      AsyncStorage.getItem(option.key)
    );
    const processResult = (result: any) =>
      result.map((value: string, i: number) => {
        if (options[i].isJSON) {
          return {
            name: options[i].key,
            value: JSON.parse(value),
          };
        }
        return {
          name: options[i].key,
          value,
        };
      });

    return Promise.all(promises).then(
      (result) => {
        const value = processResult(result);
        return Promise.resolve(value);
      },
      (errors) => Promise.reject(errors)
    );
  },
};
