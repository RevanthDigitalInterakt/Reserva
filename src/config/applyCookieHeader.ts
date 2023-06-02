import type { AxiosRequestConfig } from 'axios';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';

const applyCookieHeader = async (config: AxiosRequestConfig) => {
  const cookie = await getAsyncStorageItem('Auth:Cookie');

  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      ...(cookie ? { cookie } : {}),
    },
  };
};

export default applyCookieHeader;
