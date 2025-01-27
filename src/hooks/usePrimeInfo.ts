import { useCallback, useMemo } from 'react';
import { useRemoteConfig } from './useRemoteConfig';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { useIsTester } from './useIsTester';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import EventProvider from '../utils/EventProvider';
import { useLandingPagePrimeLazyQuery } from '../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../zustand/useApolloFetchPolicyStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export function usePrimeInfo() {
  const isTester = useIsTester();
  const { getBoolean, getString } = useRemoteConfig();
  const { profile } = useAuthStore(['profile']);
  const { hasPrimeSubscriptionInCart, actions } = useBagStore(['hasPrimeSubscriptionInCart', 'actions']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const [loadLpData] = useLandingPagePrimeLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

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

  const onAddPrimeToCart = useCallback(async (isNewFeaturePrime?: boolean) => {
    try {
      if (hasPrimeSubscriptionInCart) {
        throw new Error('Usuário já possui Prime no carrinho');
      }

      const { data } = await loadLpData();

      if (!data?.landingPagePrime) {
        throw new Error('Ocorreu um erro.');
      }

      await actions.ADD_ITEM(
        data?.landingPagePrime.productSeller,
        data?.landingPagePrime.skuId.toString(),
        1,
      );

      await actions.REFETCH_ORDER_FORM();

      if (isNewFeaturePrime) {
        EventProvider.logEvent('add_new_prime_from_bag_app', {});
      } else {
        EventProvider.logEvent('add_to_cart_prime', {
          item_quantity: 1,
          item_id: `${data?.landingPagePrime.skuId}`,
          seller: data?.landingPagePrime.productSeller,
        });
      }
    } catch (err) {
      ExceptionProvider.captureException(err, "onAddPrimeToCart - usePrimeInfo.ts", {
        isPrime: JSON.stringify(isPrime),
      });
    }
  }, [actions, hasPrimeSubscriptionInCart, loadLpData]);

  return {
    isPrime,
    primeActive,
    primeLPSearchTerms,
    onAddPrimeToCart,
  };
}
