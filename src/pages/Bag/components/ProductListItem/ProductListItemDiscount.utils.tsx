import { Box, Typography } from '@usereservaapp/reserva-ui';
import React from 'react';

export function FirstPurchaseDiscount({ discountText }: { discountText: string }) {
  return (
    <Box paddingBottom="nano" testID="com.usereserva:id/ShowFirstPurchaseDiscount">
      <Typography
        fontFamily="nunitoRegular"
        fontSize={11}
        color="verdeSucesso"
      >
        {discountText}
      </Typography>
    </Box>
  );
}

export function TotalDiscountFirstPurchase({ priceDiscount }: { priceDiscount: string }) {
  return (
    <Box
      position="absolute"
      zIndex={5}
      top={84}
      right={21}
      testID="com.usereserva:id/ShowTotalDiscountFirstPurchase"
    >
      <Typography
        color="verdeSucesso"
        fontFamily="nunitoRegular"
        fontSize={11}
      >
        -R$
        {' '}
        {priceDiscount}
      </Typography>
    </Box>
  );
}

export function integerPart(num: number) {
  return Math.floor(num);
}

export function decimalPart(num: number) {
  return (`${num?.toFixed(2)}`).split('.')[1];
}
