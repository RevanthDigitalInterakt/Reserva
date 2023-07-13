import { useCallback, useEffect } from 'react';
import { useShippingBarStore } from '../useShippingBarStore';
import { useConfigShippingBarLazyQuery } from '../../../base/graphql/generated';

export const useInitialShippingBar = (sumPriceShipping: number, loading: boolean) => {
  const {
    setSumPrice,
    setLoadingBar,
    isFreeShipping,
    freeShippingValue,
    setIsFreeShipping,
    setValueProgressBar,
    setFreeShippingValue,
  } = useShippingBarStore();

  const [getConfigShippingBar] = useConfigShippingBarLazyQuery({
    context: { clientName: 'gateway' },
  });

  const initializeShippingBar = useCallback(() => {
    setLoadingBar(true);
    if (!isFreeShipping) {
      setValueProgressBar(sumPriceShipping);
      setSumPrice(sumPriceShipping - freeShippingValue);
      return;
    }

    setValueProgressBar(freeShippingValue);
    setSumPrice(freeShippingValue);

    if (!(sumPriceShipping >= freeShippingValue)) {
      setSumPrice(sumPriceShipping - freeShippingValue);
      setValueProgressBar(sumPriceShipping);
    }
  }, [
    isFreeShipping,
    sumPriceShipping,
    freeShippingValue,
    setValueProgressBar,
    setSumPrice,
    setLoadingBar,
  ]);

  const handleInitializeShippingBar = useCallback(async (): Promise<void> => {
    const { data } = await getConfigShippingBar();

    const freeShippingValueData = data?.config?.shippingBar?.freeShippingValue;
    const isFreeShippingData = data?.config?.shippingBar?.isFreeShipping;

    if (typeof isFreeShippingData === 'boolean' && freeShippingValueData) {
      setFreeShippingValue(freeShippingValueData);
      setIsFreeShipping(isFreeShippingData);
    }
  }, [setFreeShippingValue, setIsFreeShipping, getConfigShippingBar]);

  useEffect(() => {
    if (freeShippingValue >= 0) {
      initializeShippingBar();
    }
  }, [freeShippingValue, sumPriceShipping, loading, isFreeShipping, initializeShippingBar]);

  useEffect(() => {
    handleInitializeShippingBar();
  }, [handleInitializeShippingBar]);
};
