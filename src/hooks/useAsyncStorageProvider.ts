import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import type { Cookies } from '@react-native-cookies/cookies';
import EventProvider from '../utils/EventProvider';

export interface IAsyncStorageKeys
{
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
}

type TStorageKey = keyof IAsyncStorageKeys;

export async function getAsyncStorageItem<K extends TStorageKey>(
  key: K,
): Promise<IAsyncStorageKeys[K] | null>
{
  try
  {
    const res = await AsyncStorage.getItem(key);

    return res ? JSON.parse(res) : null;
  } catch (err)
  {
    Sentry.withScope((scope) =>
    {
      scope.setExtra('key', key);
      EventProvider.captureException(err);
    });

    return null;
  }
}

export async function setAsyncStorageItem<K extends TStorageKey>(
  key: K,
  val: IAsyncStorageKeys[K],
): Promise<boolean>
{
  try
  {
    await AsyncStorage.setItem(key, JSON.stringify(val));

    return true;
  } catch (err)
  {
    Sentry.withScope((scope) =>
    {
      scope.setExtra('key', key);
      scope.setExtra('value', val);
      EventProvider.captureException(err);
    });

    return false;
  }
}

export async function removeAsyncStorageItem<K extends TStorageKey>(
  key: K,
): Promise<boolean>
{
  try
  {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (err)
  {
    Sentry.withScope((scope) =>
    {
      scope.setExtra('key', key);
      EventProvider.captureException(err);
    });

    return false;
  }
}

export default function useAsyncStorageProvider()
{
  return {
    getItem: getAsyncStorageItem,
    setItem: setAsyncStorageItem,
    removeItem: removeAsyncStorageItem,
  };
}
