import React from 'react';
import { Box, ProgressBar } from '@usereservaapp/reserva-ui';
import { useShippingBarStore, useInitialShippingBar } from '../../../../zustand/useShippingBarStore';
import { IfRenderShippingMessage } from './shippingMessage';

export interface IShippingBar {
  totalOrder: number;
  loading: boolean;
}

export const ShippingBar = ({
  totalOrder,
  loading,
}: IShippingBar) => {
  const {
    freeShippingValue,
    loadingBar,
    sumPrice,
    valueProgressBar,
  } = useShippingBarStore();

  useInitialShippingBar(totalOrder, loading);

  return loadingBar ? (
    <Box mt="micro">
      <IfRenderShippingMessage
        sumPriceShipping={totalOrder}
        freeShippingValue={freeShippingValue}
        sumPrice={sumPrice}
      />

      <Box mt="nano">
        <ProgressBar
          colorBar="neutroFrio1"
          colorProgress="verdeSucesso"
          bg="white"
          value={freeShippingValue === 0 ? 1 : valueProgressBar}
          max={freeShippingValue === 0 ? 1 : freeShippingValue}
          barHeight={5}
          colorLabel="neutroFrio2"
          showPercent={false}
        />
      </Box>
    </Box>
  ) : null;
};
