import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { apolloClientProduction, apolloClientTesting } from '../services/apolloClient';

let client: ApolloClient<NormalizedCacheObject>;

export const getApolloClient = (isTesting = false) => {
  if (!client) {
    client = isTesting ? apolloClientTesting : apolloClientProduction;
  }

  const existingCache = client.extract();

  client.cache.restore(existingCache);

  return client;
};
