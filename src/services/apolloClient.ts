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



console.log('ENVIRONMENT:', Config.ENVIRONMENT);
console.log('APP_KEY:', Config.APP_KEY);
console.log('APP_TOKEN:', Config.APP_TOKEN);
console.log('URL_BASE:', Config.URL_BASE);
console.log('URL_BASE2:', Config.URL_BASE2);
console.log('URL_BASE3:', Config.URL_BASE3);
console.log('URL_USER:', Config.URL_USER);
console.log('URL_DELETE_USER:', Config.URL_DELETE_USER);
console.log('URL_SEND_EMAIL:', Config.URL_SEND_EMAIL);
console.log('URL_VTEX_ASSETS:', Config.URL_VTEX_ASSETS);
console.log('URL_CONTENTFUL_PROD:', Config.URL_CONTENTFUL_PROD);
console.log('URL_CONTENTFUL_TEST:', Config.URL_CONTENTFUL_TEST);
console.log('CONTENTFUL_AUTH:', Config.CONTENTFUL_AUTH);
console.log('URL_VTEX_GRAPHQL:', Config.URL_VTEX_GRAPHQL);
console.log('URL_VTEX_CHECKOUT:', Config.URL_VTEX_CHECKOUT);
console.log('ANDROID_STORE_URL:', Config.ANDROID_STORE_URL);
console.log('IOS_STORE_URL:', Config.IOS_STORE_URL);

const httpLink = new HttpLink({
  uri: Config.URL_VTEX_GRAPHQL,
});

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
  })
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
  })
);

const authAfterware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const { data } = response;

    if (
      data?.classicSignIn === 'Success' ||
      data?.accessKeySignIn === 'Success' ||
      data?.sendEmailVerification === true
    ) {
      const { response: res } = operation.getContext();

      response.data.cookie = res.headers.map['set-cookie'];
    }
    return response;
  })
);

const authLinkHeader = setContext(async (_, { headers }) => {
  const cookie = await AsyncStorage.getItem('@RNAuth:cookie');

  return {
    headers: {
      ...headers,
      cookie,
    },
  };
});

// const link = from([authLinkHeader, authAfterware, httpLink]);
const linkTesting = from([
  authLinkHeader,
  authAfterware,
  directionalLinkTesting,
]);
export const apolloClientTesting = new ApolloClient({
  link: linkTesting,
  cache: new InMemoryCache(),
});

// const link = from([authLinkHeader, authAfterware, httpLink]);
const linkProduction = from([
  authLinkHeader,
  authAfterware,
  directionalLinkProduction,
]);
export const apolloClientProduction = new ApolloClient({
  link: linkProduction,
  cache: new InMemoryCache(),
});
