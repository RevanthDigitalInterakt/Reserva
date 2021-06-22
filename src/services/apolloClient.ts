import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-community/async-storage";

const httpLink = new HttpLink({
  uri: 'https://lojausereserva.myvtex.com/_v/private/graphql/v1',
});

const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => { 
    const { data } = response;

    if(data?.classicSignIn === 'Success'){
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

const link = from([authLinkHeader, authAfterware, httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})