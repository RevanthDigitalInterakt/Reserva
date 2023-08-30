import type { AxiosRequestConfig } from 'axios';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';
import { useRemoteConfig } from '../hooks/useRemoteConfig';

const applyCookieHeader = async (config: AxiosRequestConfig) => {
  const cookie = await getAsyncStorageItem('Auth:Cookie');

  // TODO remove after 100% migrate new webview checkout
  const BASE_URL_NEW_WEBVIEW = 'https://appqa.usereserva.com/api/';

  const { getBoolean } = useRemoteConfig.getState();

  const showNewWebview = getBoolean('show_new_webview_checkout');
  const CookieAB = showNewWebview ? 'VtexIdclientAutCookie_applojausereservaqa' : 'VtexIdclientAutCookie_lojausereserva';

  let newBaseURL = config.baseURL;

  if (showNewWebview) {
    const isBaseUrlWebview = [
      'https://www.usereserva.com/',
      'https://lojausereserva.myvtex.com/api/']
      .includes(config.baseURL ? config.baseURL : '');

    newBaseURL = isBaseUrlWebview ? BASE_URL_NEW_WEBVIEW : config.baseURL;
  }

  return {
    ...config,
    baseURL: newBaseURL,
    headers: {
      'x-vtex-cookie': CookieAB,
      ...(config.headers || {}),
      ...(cookie ? { cookie } : {}),
    },
  };
};

export default applyCookieHeader;
