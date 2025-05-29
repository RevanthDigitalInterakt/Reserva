import { useMemo } from 'react';
import { apolloClientProduction, apolloClientTesting } from '../services/apolloClient';

export default function useApolloClientHook(isTesting: boolean) {
  const client = useMemo(() => (
    isTesting ? apolloClientTesting : apolloClientProduction
  ), [isTesting]);

  return client;
}
