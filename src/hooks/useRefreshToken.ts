import AsyncStorage from '@react-native-community/async-storage';
import { useCallback, useEffect } from 'react';
import type { FetchResult } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useRefreshTokenMutation } from '../base/graphql/generated';
import EventProvider from '../utils/EventProvider';
import useAsyncStorageProvider from './useAsyncStorageProvider';

interface IUseRefreshToken {
  setTokenAsync: (token: string) => void;
  setCookieAsync: (authCookie: string) => void;
  verifyRefreshTime: () => Promise<boolean | undefined>;
  refreshToken: () => Promise<FetchResult>;
  getRefreshToken: () => Promise<void>;
}

const useRefreshToken = ():IUseRefreshToken => {
  const { setItem, getItem } = useAsyncStorageProvider();
  const [refreshToken] = useRefreshTokenMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });
  const navigation = useNavigation();

  const verifyRefreshTime = useCallback(async () => {
    const nextRefreshTime = await getItem('@RNAuth:NextRefreshTime') || 0;

    if (nextRefreshTime === 0) {
      return false;
    }

    let expires = 0;
    const timeNow = new Date().getTime();

    const date = new Date();
    date.setDate(date.getDate() + 1);

    if (nextRefreshTime !== 0) {
      expires = nextRefreshTime;
    }

    if (timeNow > expires) {
      expires = date.getTime();
      await setItem('@RNAuth:NextRefreshTime', expires);
      return true;
    }

    return timeNow > expires;
  }, [getItem, setItem]);

  const setTokenAsync = useCallback(async (token: string) => {
    if (!token) return;
    await AsyncStorage.setItem('@RNAuth:Token', token);
  }, []);

  const setCookieAsync = useCallback(async (authCookie: string) => {
    if (!authCookie) return;
    await AsyncStorage.setItem('@RNAuth:cookie', authCookie);
  }, []);

  const getRefreshToken = useCallback(async () => {
    const tokenAsyncStorage = await AsyncStorage.getItem('@RNAuth:Token');

    const timeToRenew = await verifyRefreshTime();

    if (!tokenAsyncStorage) return;

    try {
      if (!timeToRenew) return;
      const { data } = await refreshToken();

      if (!data) navigation.navigate('Login', { comeFrom: 'Menu' });

      if (data) {
        const { token, authCookie } = data?.refreshToken;

        if (token && authCookie) {
          await setTokenAsync(token);
          await setCookieAsync(authCookie);
        }
      }
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [navigation, refreshToken, setCookieAsync, setTokenAsync, verifyRefreshTime]);

  useEffect(() => {
    async function callGetRefreshToken() {
      await getRefreshToken();
    }
    callGetRefreshToken();
  }, [getRefreshToken]);

  return {
    setTokenAsync,
    setCookieAsync,
    verifyRefreshTime,
    refreshToken,
    getRefreshToken,
  };
};

export default useRefreshToken;
