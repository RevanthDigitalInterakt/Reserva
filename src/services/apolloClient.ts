import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-community/async-storage";
import { RetryLink } from '@apollo/client/link/retry';


const httpLink = new HttpLink({
  uri: 'https://lojausereserva.myvtex.com/_v/private/graphql/v1',
});

const directionalLink = new RetryLink().split(
  (operation) => operation.getContext().clientName === "contentful",
  new HttpLink(
    {
      uri: "https://graphql.contentful.com/content/v1/spaces/6jsfqc13oxv4", //environments/testing
      headers: {
        "Authorization": "Bearer e7GuVP-T2J7zqAR8NWZK6IhteMokbshJIx1_c16TG6U"
      }
    }),
  new HttpLink(
    {
      uri: "https://lojausereserva.myvtex.com/_v/private/graphql/v1",
    })
);

const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
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
})

const authLinkHeader = setContext(async (_, { headers }) => {
  const cookie = await AsyncStorage.getItem('@RNAuth:cookie');

  return {
    headers: {
      ...headers,
      cookie,
    },
  };
})

// const link = from([authLinkHeader, authAfterware, httpLink]);
const link = from([authLinkHeader, authAfterware, directionalLink]);
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
