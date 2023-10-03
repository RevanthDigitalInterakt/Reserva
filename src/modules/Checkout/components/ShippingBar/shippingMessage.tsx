import React from 'react';

import { Text, View } from 'react-native';
import styles from './shippingMessage.styles';
import { PriceCustom } from '../PriceCustom';
import type { IPropsShippingMessage } from './types';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import IconGreenCheckMark from '../../../../../assets/icons/IconGreenCheckMark';

export const IfRenderShippingMessage = ({
  sumPriceShipping,
  sumPrice,
  freeShippingValue,
}: IPropsShippingMessage) => {
  const { isPrime } = usePrimeInfo();

  if (isPrime) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <IconGreenCheckMark />
          <Text style={styles.text}>Cliente </Text>
        </View>
        <Text style={styles.textPrime}>
          PRIME
        </Text>
        <Text style={styles.text}>já tem </Text>
        <Text style={styles.greenText}>
          FRETE GRÁTIS!
        </Text>
      </View>
    );
  }

  if (sumPriceShipping < freeShippingValue) {
    return (
      <View style={styles.container}>
        <View>
          <Text>Faltam apenas </Text>
        </View>
        <PriceCustom
          fontFamily="nunitoBold"
          sizeInterger={3}
          sizeDecimal={1}
          num={-sumPrice}
        />
        <Text style={styles.text}> para ganhar </Text>
        <Text style={styles.redText}>
          FRETE GRÁTIS
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <IconGreenCheckMark />
      <Text style={styles.darkGreenText}>Você ganhou </Text>
      <Text style={styles.greenText}>
        FRETE GRÁTIS!
      </Text>
    </View>
  );
};
