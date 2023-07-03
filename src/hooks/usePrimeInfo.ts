import { useMemo } from 'react';
import { useRemoteConfig } from './useRemoteConfig';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { useIsTester } from './useIsTester';
import { useBagStore } from '../zustand/useBagStore/useBagStore';

export function usePrimeInfo() {
  const isTester = useIsTester();
  const { getBoolean, getString } = useRemoteConfig();
  const { profile } = useAuthStore(['profile']);
  const { hasPrimeSubscriptionInCart } = useBagStore(['hasPrimeSubscriptionInCart']);

  const primeActive = useMemo(() => (
    getBoolean(isTester ? 'show_prime_tester' : 'show_prime')
  ), [getBoolean, isTester]);

  const primeLPSearchTerms = useMemo(() => {
    if (!primeActive) return [];

    return getString('primelp_terms_search')?.split('|');
  }, [getString, primeActive]);

  const isPrime = useMemo(() => (
    profile?.isPrime || hasPrimeSubscriptionInCart || false
  ), [profile?.isPrime, hasPrimeSubscriptionInCart]);

  return {
    isPrime,
    primeActive,
    primeLPSearchTerms,
  };
}
