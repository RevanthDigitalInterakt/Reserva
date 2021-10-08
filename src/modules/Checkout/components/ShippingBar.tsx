import React, { useEffect, useState } from 'react';

import { Box, Typography, ProgressBar } from 'reserva-ui';

import { PriceCustom } from './PriceCustom';

export interface ShippingBarProps {
  sumPriceShipping: number;
  isFreeShipping: number;
  loading: boolean;
}

export const ShippingBar = ({
  sumPriceShipping,
  isFreeShipping,
  loading,
}: ShippingBarProps) => {
  const PRICE_SHIPPING_FREE = 299.0;
  const [trueFreeShipping, setTrueFreeShipping] = useState(false);
  const [loadingBar, setLoadingBar] = useState(loading);
  const [sumPrice, setSumPrice] = useState(0);

  const isShippingFree = () => {
    setLoadingBar(true);
    if (isFreeShipping > 0) {
      if (sumPriceShipping <= PRICE_SHIPPING_FREE) {
        setTrueFreeShipping(false);
        setSumPrice(sumPriceShipping - PRICE_SHIPPING_FREE);
      }
    } else {
      setTrueFreeShipping(true);
      setSumPrice(PRICE_SHIPPING_FREE);
    }
  };

  useEffect(() => {
    isShippingFree();
  }, [sumPriceShipping]);

  return (
    <>
      {loadingBar && (
        <Box mt="micro">
          {sumPriceShipping <= PRICE_SHIPPING_FREE ? (
            <Box flexDirection="row">
              <Typography>Faltam apenas </Typography>
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
          ) : (
            <Box flexDirection="row">
              <Typography color="verdeSucesso">Você ganhou </Typography>
              <Typography color="verdeSucesso" fontWeight="bold">
                frete grátis!
              </Typography>
            </Box>
          )}
          <Box mt="nano">
            <ProgressBar
              colorBar="neutroFrio1"
              colorProgress="verdeSucesso"
              bg="white"
              value={
                sumPriceShipping >= PRICE_SHIPPING_FREE
                  ? PRICE_SHIPPING_FREE
                  : sumPriceShipping
              }
              max={PRICE_SHIPPING_FREE}
              barHeight={5}
              colorLabel="neutroFrio2"
              showPercent={false}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
