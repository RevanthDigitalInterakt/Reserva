import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';
import EventProvider from '../utils/EventProvider';
import type { Cookies } from '../pages/WebViewQA/helpers/GetCookies';

export interface IAsyncStorageKeys {
  '@RNOrder:ChristmasCouponModalOrderId': string;
  '@RNOrder:RonItems': string[];
  '@RNSession:Ron': boolean;
  isTesting: boolean,
  isAppFirstLaunched: boolean,

  '@RNWebView:WebViewQACookiesList': Cookies
}

type TStorageKey = keyof IAsyncStorageKeys;

async function getItem<K extends TStorageKey>(key: K): Promise<IAsyncStorageKeys[K] | null> {
  try {
    const res = await AsyncStorage.getItem(key);

    return res ? JSON.parse(res) : null;
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setExtra('key', key);
      EventProvider.captureException(err);
    });

    return null;
  }
}

async function setItem<K extends TStorageKey>(key: K, val: IAsyncStorageKeys[K]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(val));

    return true;
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setExtra('key', key);
      scope.setExtra('value', val);
      EventProvider.captureException(err);
    });

    return false;
  }
}

async function removeItem<K extends TStorageKey>(key: K): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (err) {
    Sentry.withScope((scope) => {
      scope.setExtra('key', key);
      EventProvider.captureException(err);
    });

    return false;
  }
}

export default function useAsyncStorageProvider() {
  return { getItem, setItem, removeItem };
}
