import type { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';

const applyCookieHeader = async (config: AxiosRequestConfig) => {
  const cookie = await getAsyncStorageItem('Auth:Cookie');

  const Cookie = 'VtexIdclientAutCookie_applojausereservaqa';

  const BASE_URL_NEW_WEBVIEW = `${Config.URL_VTEX_QA}/api/`;

  let newBaseURL = config.baseURL;
  const isBaseUrlWebview = [
    'https://www.usereserva.com/',
    Config.URL_BASE]
    .includes(config.baseURL ? config.baseURL : '');

  newBaseURL = isBaseUrlWebview ? BASE_URL_NEW_WEBVIEW : config.baseURL;

  return {
    ...config,
    baseURL: newBaseURL,
    headers: {
      'x-vtex-cookie': Cookie,
      ...(config.headers || {}),
      ...(cookie ? { cookie } : {}),
    },
  };
};

export default applyCookieHeader;
