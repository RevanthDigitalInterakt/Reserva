import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProgressBar } from './progressBar';
import { useShippingBarStore, useInitialShippingBar } from '../../../../zustand/useShippingBarStore';
import { IfRenderShippingMessage } from './shippingMessage';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';

export interface IShippingBar {
  totalOrder: number;
  loading: boolean;
}

export function ShippingBar({ totalOrder, loading }: IShippingBar) {
  const { isPrime } = usePrimeInfo();

  const {
    freeShippingValue,
    loadingBar,
    sumPrice,
    valueProgressBar,
  } = useShippingBarStore();

  useInitialShippingBar(totalOrder, loading);

  const isFreeShipping = useMemo(
    () => freeShippingValue === 0 || isPrime,
    [freeShippingValue, isPrime],
  );

  return loadingBar ? (
    <View style={{ marginTop: 12 }}>
      <IfRenderShippingMessage
        sumPriceShipping={totalOrder}
        freeShippingValue={freeShippingValue}
        sumPrice={sumPrice}
      />

      <View style={{ marginTop: 8 }}>
        <ProgressBar
          value={isFreeShipping ? 1 : valueProgressBar}
          max={isFreeShipping ? 1 : freeShippingValue}
          barHeight={5}
          showPercent={false}
        />
      </View>
    </View>
  ) : null;
}
