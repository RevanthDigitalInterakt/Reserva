import { useCallback, useEffect } from 'react';
import useMarketPlaceInStore from '../zustand/useMarketPlaceInStore';
import { useMktinStatusLazyQuery, useSellersMktinLazyQuery } from '../base/graphql/generated';
import EventProvider from '../utils/EventProvider';
import { useApolloFetchPolicyStore } from '../zustand/useApolloFetchPolicyStore';

const useInitialMarketPlaceIn = () => {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const setMktinActive = useMarketPlaceInStore((state) => state.setMktinActive);
  const setSellersMktIn = useMarketPlaceInStore((state) => state.setSellersMktIn);

  const [sellersMktIn] = useSellersMktinLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('sellersMktin'),
  });

  const [mktInStatus] = useMktinStatusLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('mktinStatus'),
  });

  const getSellersMktIn = useCallback(async () => {
    try {
      const { data } = await sellersMktIn();
      if (!data?.sellersMktin) {
        setSellersMktIn([]);
        return;
      }

      if (data.sellersMktin.length) {
        setSellersMktIn(data.sellersMktin);
      }
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, []);

  const checkMKTInActive = useCallback(async () => {
    try {
      const { data } = await mktInStatus();

      if (data?.mktinStatus) {
        setMktinActive(data.mktinStatus);
      }
    } catch {
      setMktinActive(false);
    }
  }, []);

  useEffect(() => {
    checkMKTInActive();
  }, [checkMKTInActive]);

  useEffect(() => {
    getSellersMktIn();
  }, [getSellersMktIn]);
};

export default useInitialMarketPlaceIn;
