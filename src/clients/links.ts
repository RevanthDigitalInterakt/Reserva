import {
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import Config from 'react-native-config';
import CookieManager from '@react-native-cookies/cookies';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';

const COOKIE = 'VtexIdclientAutCookie_applojausereservaqa';

export const directionalLinkProduction = new RetryLink().split(
  (operation) => operation.getContext().clientName === 'contentful',
  new HttpLink({
    uri: Config.URL_CONTENTFUL_PROD,
    headers: { Authorization: Config.CONTENTFUL_AUTH! },
  }),
  new HttpLink({ uri: Config.URL_VTEX_GRAPHQL }),
);

export const directionalLinkTesting = new RetryLink().split(
  (operation) => operation.getContext().clientName === 'contentful',
  new HttpLink({
    uri: Config.URL_CONTENTFUL_TEST,
    headers: { Authorization: Config.CONTENTFUL_AUTH! },
  }),
  new HttpLink({ uri: Config.URL_VTEX_GRAPHQL }),
);

export const authAfterware = new ApolloLink((operation, forward) => forward(operation).map(
  (response) => {
    const { data } = response;

    if (data?.signIn?.authCookie
      || data?.signUp?.authCookie
      || data?.redefinePassword?.authCookie
      || data?.refreshToken?.authCookie
    ) {
      let cookie;

      if (data?.signIn?.authCookie) cookie = data?.signIn?.authCookie?.replace(`${COOKIE}=`, '');
      if (data?.signUp?.authCookie) cookie = data?.signUp?.authCookie?.replace(`${COOKIE}=`, '');
      if (data?.redefinePassword?.authCookie) cookie = data?.redefinePassword?.authCookie.replace(`${COOKIE}=`, '');
      if (data?.refreshToken?.authCookie) cookie = data?.refreshToken?.authCookie.replace(`${COOKIE}=`, '');

      const date = new Date();
      date.setDate(date.getDate() + 1);

      const expires = date.toISOString();

      CookieManager.set(`${Config.URL_USER}`, {
        name: 'VtexIdclientAutCookie_lojausereserva',
        value: cookie,
        domain: 'www.usereserva.com',
        path: '/',
        version: '1',
        expires,
      });

      CookieManager.set(`${Config.URL_BASE_COOKIE}`, {
        name: 'VtexIdclientAutCookie_lojausereserva',
        value: cookie,
        domain: 'lojausereserva.myvtex.com',
        path: '/',
        version: '1',
        expires,
      });

      CookieManager.set(`${Config.URL_VTEX_QA}`, {
        name: 'VtexIdclientAutCookie_applojausereservaqa',
        value: cookie,
        domain: 'appqa.usereserva.com',
        path: '/',
        version: '1',
        expires,
      });

      CookieManager.set(`${Config.URL_STORE_VTEX_QA}`, {
        name: 'VtexIdclientAutCookie_applojausereservaqa',
        value: cookie,
        domain: 'applojausereservaqa.myvtex.com',
        path: '/',
        version: '1',
        expires,
      });
    }
    return response;
  },
));

export const authLinkHeader = setContext(async (_, { headers }) => {
  const cookie = await getAsyncStorageItem('Auth:Cookie');

  return {
    headers: { ...headers, cookie, 'x-vtex-cookie': 'VtexIdclientAutCookie_applojausereservaqa' },
  };
});
