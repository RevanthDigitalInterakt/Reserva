import React, { useMemo } from 'react';
import { Box, ProgressBar } from '@usereservaapp/reserva-ui';
import { useShippingBarStore, useInitialShippingBar } from '../../../../zustand/useShippingBarStore';
import { IfRenderShippingMessage } from './shippingMessage';

export interface IShippingBar {
  totalOrder: number;
  loading: boolean;
  isPrime: boolean;
}

export const ShippingBar = ({
  totalOrder,
  loading,
  isPrime,
}: IShippingBar) => {
  const {
    freeShippingValue,
    loadingBar,
    sumPrice,
    valueProgressBar,
  } = useShippingBarStore();

  useInitialShippingBar(totalOrder, loading);

  const isFreeShipping = useMemo(() => freeShippingValue === 0 || isPrime,
    [freeShippingValue, isPrime]);

  return loadingBar ? (
    <Box mt="micro">
      <IfRenderShippingMessage
        sumPriceShipping={totalOrder}
        freeShippingValue={freeShippingValue}
        sumPrice={sumPrice}
        isPrime={isPrime}
      />

      <Box mt="nano">
        <ProgressBar
          colorBar="neutroFrio1"
          colorProgress="verdeSucesso"
          bg="white"
          value={isFreeShipping ? 1 : valueProgressBar}
          max={isFreeShipping ? 1 : freeShippingValue}
          barHeight={5}
          colorLabel="neutroFrio2"
          showPercent={false}
        />
      </Box>
    </Box>
  ) : null;
};
