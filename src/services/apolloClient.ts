import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import Config from 'react-native-config';
import CookieManager from '@react-native-cookies/cookies';
import { gatewayLink } from '../clients/gateway/gatewayLink';
import { getAsyncStorageItem } from '../hooks/useAsyncStorageProvider';

const Cookie = 'VtexIdclientAutCookie_applojausereservaqa';

const directionalLinkProduction = new RetryLink().split(
  (operation) => operation.getContext().clientName === 'contentful',
  new HttpLink({
    uri: Config.URL_CONTENTFUL_PROD,
    headers: { Authorization: Config.CONTENTFUL_AUTH! },
  }),
  new HttpLink({ uri: Config.URL_VTEX_GRAPHQL }),
);

const directionalLinkTesting = new RetryLink().split(
  (operation) => operation.getContext().clientName === 'contentful',
  new HttpLink({
    uri: Config.URL_CONTENTFUL_TEST,
    headers: { Authorization: Config.CONTENTFUL_AUTH! },
  }),
  new HttpLink({ uri: Config.URL_VTEX_GRAPHQL }),
);

const authAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const { data } = response;

  if (data?.signIn?.authCookie
    || data?.signUp?.authCookie
    || data?.redefinePassword?.authCookie
    || data?.refreshToken?.authCookie
  ) {
    let cookie;

    if (data?.signIn?.authCookie) cookie = data?.signIn?.authCookie?.replace(`${Cookie}=`, '');
    if (data?.signUp?.authCookie) cookie = data?.signUp?.authCookie?.replace(`${Cookie}=`, '');
    if (data?.redefinePassword?.authCookie) cookie = data?.redefinePassword?.authCookie.replace(`${Cookie}=`, '');
    if (data?.refreshToken?.authCookie) cookie = data?.refreshToken?.authCookie.replace(`${Cookie}=`, '');

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

    CookieManager.set('https://appqa.usereserva.com', {
      name: 'VtexIdclientAutCookie_applojausereservaqa',
      value: cookie,
      domain: 'appqa.usereserva.com',
      path: '/',
      version: '1',
      expires,
    });

    CookieManager.set('https://applojausereservaqa.myvtex.com', {
      name: 'VtexIdclientAutCookie_applojausereservaqa',
      value: cookie,
      domain: 'applojausereservaqa.myvtex.com',
      path: '/',
      version: '1',
      expires,
    });
  }
  return response;
}));

const authLinkHeader = setContext(async (_, { headers }) => {
  const cookie = await getAsyncStorageItem('Auth:Cookie');

  return {
    headers: { ...headers, cookie, 'x-vtex-cookie': Cookie },
  };
});

const linkTesting = from([
  authLinkHeader,
  authAfterware,
  ApolloLink.split(
    (operation) => operation.getContext().clientName === 'gateway',
    new RetryLink().concat(gatewayLink),
    directionalLinkTesting,
  ),
]);

const linkProduction = from([
  authLinkHeader,
  authAfterware,
  ApolloLink.split(
    (operation) => operation.getContext().clientName === 'gateway',
    new RetryLink().concat(gatewayLink),
    directionalLinkProduction,
  ),
]);

export const apolloClientTesting = new ApolloClient({
  link: linkTesting,
  cache: new InMemoryCache(),
});

export const apolloClientProduction = new ApolloClient({
  link: linkProduction,
  cache: new InMemoryCache({
    resultCaching: true,
  }),
});
