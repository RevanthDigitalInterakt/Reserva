import React from 'react';

import { Box, ProgressBar } from '@usereservaapp/reserva-ui';

import { useShippingBarStore, useInitiaShippingBar } from '../../../../zustand/useShippingBarStore';

import type { IPropsShippingBar } from './types';
import { IfRenderShippingMessage } from './shippingMessage';

export interface ShippingBarProps {
  sumPriceShipping: number;
  totalDelivery: number;
  loading: boolean;
}

export const ShippingBar = ({
  sumPriceShipping,
  loading,
}: IPropsShippingBar) => {
  const {
    freeShippingValue,
    loadingBar,
    sumPrice,
    valueProgressBar,
  } = useShippingBarStore();

  useInitiaShippingBar(sumPriceShipping, loading);

  return loadingBar ? (
    <Box mt="micro">

      <IfRenderShippingMessage
        sumPriceShipping={sumPriceShipping}
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
