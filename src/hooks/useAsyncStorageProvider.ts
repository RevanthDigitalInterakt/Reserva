import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Cookies } from '@react-native-cookies/cookies';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export interface IAsyncStorageKeys {
  '@RNOrder:RonItems': string[];
  '@RNSession:Ron': boolean;
  '@DitoNotification:Ref': string;
  '@DitoNotification:Id': number;
  isTesting: boolean,
  isAppFirstLaunched: boolean,
  '@Dito:userRef': string,
  '@RNWebView:WebViewQACookiesList': Cookies,
  // Auth keys
  'Auth:Token': string;
  'Auth:Cookie': string;
  'Auth:TokenRefreshTime': number;
  'orderFormId': string;
  'rouletCoupon': {
    code: string;
    timestamp: string;
    blocked: boolean;
  },
  '@Newsletter:IdCampaign': string;
  'FIRST_TIME_OPEN': string;
  'User:Geolocation': string;
}

type TStorageKey = keyof IAsyncStorageKeys;

export async function getAsyncStorageItem<K extends TStorageKey>(
  key: K,
): Promise<IAsyncStorageKeys[K] | null> {
  try {
    const res = await AsyncStorage.getItem(key);

    return res ? JSON.parse(res) : null;
  } catch (err) {
    ExceptionProvider.captureException(err, "getAsyncStorageItem - useAsyncStorageProvider.ts", { key });

    return null;
  }
}

export async function setAsyncStorageItem<K extends TStorageKey>(
  key: K,
  val: IAsyncStorageKeys[K],
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(val));

    return true;
  } catch (err) {
    ExceptionProvider.captureException(err, "getAsyncStorageItem - setAsyncStorageItem.ts", { key, value: (JSON.stringify(val) || "") });

    return false;
  }
}

export async function removeAsyncStorageItem<K extends TStorageKey>(
  key: K,
): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (err) {
    ExceptionProvider.captureException(err, "getAsyncStorageItem - removeAsyncStorageItem.ts", { key });

    return false;
  }
}

export default function useAsyncStorageProvider() {
  return {
    getItem: getAsyncStorageItem,
    setItem: setAsyncStorageItem,
    removeItem: removeAsyncStorageItem,
  };
}
