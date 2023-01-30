import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

const directionalLinkProduction = new RetryLink().split(
  (operation) => operation.getContext().clientName === 'contentful',
  new HttpLink({
    uri: Config.URL_CONTENTFUL_PROD,
    headers: {
      Authorization: Config.CONTENTFUL_AUTH,
    },
  }),
  new HttpLink({
    uri: Config.URL_VTEX_GRAPHQL,
  }),
);

const directionalLinkTesting = new RetryLink().split(
  (operation) => operation.getContext().clientName === 'contentful',
  new HttpLink({
    uri: Config.URL_CONTENTFUL_TEST,
    headers: {
      Authorization: Config.CONTENTFUL_AUTH,
    },
  }),
  new HttpLink({
    uri: Config.URL_VTEX_GRAPHQL,
  }),
);

const authAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const { data } = response;

  if (
    data?.classicSignIn === 'Success'
      || data?.accessKeySignIn === 'Success'
      || data?.sendEmailVerification === true
  ) {
    const { response: res } = operation.getContext();

    response.data.cookie = res.headers.map['set-cookie'];
  }
  return response;
}));

const authLinkHeader = setContext(async (_, { headers }) => {
  const cookie = await AsyncStorage.getItem('@RNAuth:cookie');

  return {
    headers: {
      ...headers,
      cookie,
    },
  };
});

const linkTesting = from([
  authLinkHeader,
  authAfterware,
  directionalLinkTesting,
]);
export const apolloClientTesting = new ApolloClient({
  link: linkTesting,
  cache: new InMemoryCache(),
});

const linkProduction = from([
  authLinkHeader,
  authAfterware,
  directionalLinkProduction,
]);
export const apolloClientProduction = new ApolloClient({
  link: linkProduction,
  cache: new InMemoryCache(),
});
