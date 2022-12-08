import React, { useCallback, useEffect, useState } from 'react';

import { Box, Typography, ProgressBar } from '@danilomsou/reserva-ui';

import { PriceCustom } from './PriceCustom';
import { configCollection } from '../../../graphql/homePage/HomeQuery';
import { useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

export interface ShippingBarProps {
  sumPriceShipping: number;
  totalDelivery: number;
  loading: boolean;
}

export const ShippingBar = ({
  sumPriceShipping,
  totalDelivery,
  loading,
}: ShippingBarProps) => {
  const [freeShippingValue, setFreeShippingValue] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  const [loadingBar, setLoadingBar] = useState(loading);
  const [sumPrice, setSumPrice] = useState(0);
  const [{ collectionData }, setConfigCollection] = useState<{
    collectionData: any;
  }>({ collectionData: null });
  const [getCollection] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [ValueProgressBar, setValueProgressBar] = useState(0);

  const isShippingFree = () => {
    setLoadingBar(true);
    if (isFreeShipping) {
      setSumPrice(freeShippingValue);
    } else if (sumPriceShipping >= freeShippingValue) {
      setSumPrice(freeShippingValue);
    } else {
      setSumPrice(sumPriceShipping - freeShippingValue);
    }
  };

  const defineProgressBar = () => {
    if (isFreeShipping) {
      setValueProgressBar(freeShippingValue);
    } else if (sumPriceShipping >= freeShippingValue) {
      setValueProgressBar(freeShippingValue);
    } else {
      setValueProgressBar(sumPriceShipping);
    }
    isShippingFree();
  };

  useEffect(() => {
    getCollection().then((response) => {
      setConfigCollection({
        collectionData: response.data,
      });
    });
  }, [sumPriceShipping]);

  useFocusEffect(
    useCallback(() => {
      if (collectionData !== null) {
        const freeShippingValueData =
          collectionData?.configCollection?.items[0]?.shippingBar
            ?.freeShippingValue;

        const isFreeShippingData =
          collectionData?.configCollection?.items[0]?.shippingBar
            ?.isFreeShipping;

        setFreeShippingValue(freeShippingValueData);
        setIsFreeShipping(isFreeShippingData);
      }
    }, [collectionData])
  );

  useEffect(() => {
    if (freeShippingValue >= 0) {
      defineProgressBar();
    }
  }, [freeShippingValue, sumPriceShipping, loading]);

  return (
    <>
      {loadingBar && (
        <Box mt="micro">
          {isFreeShipping ? (
            <Box flexDirection="row">
              <Typography color="verdeSucesso">Você ganhou </Typography>
              <Typography color="verdeSucesso" fontWeight="bold">
                frete grátis!
              </Typography>
            </Box>
          ) : sumPriceShipping < freeShippingValue ? (
            <Box flexDirection="row">
              <Box>
                <Typography>Faltam apenas {''}</Typography>
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
              value={freeShippingValue === 0 ? 1 : ValueProgressBar}
              max={freeShippingValue === 0 ? 1 : freeShippingValue}
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
