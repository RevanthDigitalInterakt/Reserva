import React from 'react';

import { Box, Typography } from '@usereservaapp/reserva-ui';

import { PriceCustom } from '../PriceCustom';
import type { IPropsShippingMessage } from './types';

export const IfRenderShippingMessage = ({
  sumPriceShipping, sumPrice,
  freeShippingValue,
}: IPropsShippingMessage) => {
  if (sumPriceShipping < freeShippingValue) {
    return (
      <Box flexDirection="row">
        <Box>
          <Typography>Faltam apenas </Typography>
        </Box>
        <PriceCustom
          fontFamily="nunitoBold"
          sizeInterger={3}
          sizeDecimal={1}
          num={-sumPrice}
        />
        <Typography> para ganhar </Typography>
        <Typography color="vermelhoRSV" fontWeight="bold">
          frete grátis
        </Typography>
      </Box>
    );
  }

  return (
    <Box flexDirection="row">
      <Typography color="verdeSucesso">Você ganhou </Typography>
      <Typography color="verdeSucesso" fontWeight="bold">
        frete grátis!
      </Typography>
    </Box>
  );
};
