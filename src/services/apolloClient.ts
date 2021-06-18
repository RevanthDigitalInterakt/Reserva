import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'https://lojausereserva.myvtex.com/_v/public/graphql/v1',
  cache: new InMemoryCache()
})