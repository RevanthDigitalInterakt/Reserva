import AsyncStorage from '@react-native-community/async-storage';
import type { AxiosRequestConfig } from 'axios';

const applyCookieHeader = async (config: AxiosRequestConfig) => {
  const cookie = await AsyncStorage.getItem('@RNAuth:cookie');

  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      ...(cookie ? { cookie } : {}),
    },
  };
};

export default applyCookieHeader;
