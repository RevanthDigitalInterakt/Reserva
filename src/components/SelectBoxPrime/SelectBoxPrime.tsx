import React, { useMemo } from 'react';
import {
  ImageBackground, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { useRemoteConfig, type TTypesInstallments } from '../../hooks/useRemoteConfig';
import { decimalPart, integerPart } from '../../utils/numberUtils';
import testProps from '../../utils/testProps';
import { Typography } from '../Typography/Typography';
import { styles } from './SelectBoxPrime.styles';
import EventProvider from '../../utils/EventProvider';

const goldBadgeImage = require('./assets/goldBadge.png');

interface SelectBoxPrimeProps {
  installment?: { number: number; value: number };
  isChecked: boolean;
  onPress: (option: string) => void;
  price?: number;
  savedValue: number;
}

export function SelectBoxPrime({
  installment,
  isChecked,
  onPress,
  price = 0,
  savedValue,
}: SelectBoxPrimeProps) {
  const { getString } = useRemoteConfig();

  const typeInstallments: TTypesInstallments = useMemo(() => (
    getString('installments_prime')
  ), [getString]) as TTypesInstallments;

  const containerSelectBoxes = StyleSheet.flatten([
    styles.checkBoxContainer,
    typeInstallments === 'hide_installments' ? styles.start : styles.between,
    typeInstallments === 'hide_installments' && styles.minHeight,
  ]);

  const containerPrices = StyleSheet.flatten([
    styles.priceDataWrapper,
    typeInstallments === 'hide_installments' && styles.ml,
  ]);

  const separator = StyleSheet.flatten([
    styles.separator,
    typeInstallments === 'hide_installments' ? styles.mDefault : styles.mt,
  ]);

  return (
    <TouchableOpacity
      style={styles.primePrice}
      onPress={() => {
        EventProvider.logEvent('prime_price_box_click', {});
        onPress('pricePrime');
      }}
      disabled={isChecked}
      {...testProps('select_box_price_prime')}
    >
      <View style={containerSelectBoxes}>
        <View style={styles.primeCheckBox}>
          {isChecked && (
            <View
              style={styles.primeCheckBoxFill}
              {...testProps('select_box_price_prime_checked')}
            />
          )}
        </View>

        <View style={containerPrices}>
          <Typography
            fontFamily="reservaSansRegular"
            style={styles.normalTextRed}
          >
            Clientes
            <Typography variant="descontoTag2" fontSize={20}>
              {' '}
              Prime
            </Typography>
          </Typography>

          {typeInstallments !== 'hide_installments' && installment && (
            <View style={styles.priceContainer}>
              <Typography
                fontFamily="reservaSansRegular"
                style={styles.normalTextRed}
              >
                {installment?.number}
                x
                {' '}
              </Typography>

              <Typography
                style={styles.integerPartPrime}
                fontFamily="reservaSansRegular"
              >
                R$
                {' '}
                {`${integerPart(installment.value)},`}
              </Typography>
              <Typography
                style={styles.decimalText}
                fontWeight="bold"
                fontFamily="reservaSansRegular"
              >
                {decimalPart(installment.value)}
              </Typography>
            </View>
          )}
        </View>

        <View style={separator} />

        {typeInstallments !== 'hide_installments' && (
          <View style={styles.priceDataEconomy}>
            <ImageBackground
              source={goldBadgeImage}
              resizeMode="cover"
              style={styles.imageBackgroundBadge}
            >
              <Typography
                fontFamily="reservaSansItalic"
                style={styles.textRedBadge}
              >
                Economize
                <Typography
                  fontFamily="reservaSansRegular"
                  style={{ fontWeight: 'bold' }}
                >
                  {' '}
                  R$
                  {savedValue.toFixed(2)}
                </Typography>
              </Typography>
            </ImageBackground>

            <View style={[styles.priceContainer, styles.negativeMarginText]}>
              <Typography
                style={styles.integerPartPrime}
                fontFamily="reservaSansRegular"
              >
                R$
                {' '}
                {`${integerPart(price)},`}
              </Typography>
              <Typography
                style={styles.decimalText}
                fontWeight="bold"
                fontFamily="reservaSansRegular"
              >
                {decimalPart(price)}
              </Typography>
            </View>
          </View>
        )}
        {typeInstallments === 'hide_installments' && (
          <>
            <Typography
              style={styles.integerPartPrime}
              fontFamily="reservaSansRegular"
            >
              R$
              {' '}
              {`${integerPart(price)},`}
            </Typography>
            <Typography
              style={styles.decimalText}
              fontWeight="bold"
              fontFamily="reservaSansRegular"
            >
              {decimalPart(price)}
            </Typography>
          </>
        )}
      </View>

      <View style={styles.bePrimeBadge}>
        <Typography fontFamily="reservaSansRegular" style={styles.textWhite}>
          Seja
          <Typography variant="descontoTag2" fontSize={18}>
            {' '}
            Prime
          </Typography>
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
