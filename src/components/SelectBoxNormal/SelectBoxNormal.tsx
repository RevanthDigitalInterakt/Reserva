import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity, View,
} from 'react-native';

import type { Maybe, ProductSizeInstallmentOutput } from '../../base/graphql/generated';
import { useRemoteConfig, type TTypesInstallments } from '../../hooks/useRemoteConfig';
import { decimalPart, integerPart } from '../../utils/numberUtils';
import testProps from '../../utils/testProps';
import { Typography } from '../Typography/Typography';
import { styles } from './SelectBoxNormal.styles';
import EventProvider from '../../utils/EventProvider';

export interface SelectBoxNormalProps {
  onPress: (option: string) => void;
  isChecked: boolean;
  installmentsNumber: number;
  installmentsPrice: number;
  price?: number;
  installmentsEqualPrime?: Maybe<ProductSizeInstallmentOutput>;
}

export function SelectBoxNormal({
  installmentsNumber,
  installmentsPrice,
  isChecked,
  onPress,
  installmentsEqualPrime,
  price = 0,
}: SelectBoxNormalProps) {
  const { getString } = useRemoteConfig();

  const typeInstallments: TTypesInstallments = useMemo(() => (
    getString('installments_prime')
  ), [getString]) as TTypesInstallments;

  const showInstallments = (typeInstallments !== 'hide_installments' && installmentsEqualPrime)
  || (!installmentsEqualPrime);

  const separator = StyleSheet.flatten([
    styles.separator,
    typeInstallments === 'hide_installments' ? styles.mDefaultSeparator : styles.mtSeparator,
  ]);

  const pricesWrapper = StyleSheet.flatten([
    styles.priceContainer,
    styles.marginText,
    typeInstallments === 'hide_installments' ? styles.mDefaultPrice : styles.mtPrice,
  ]);

  const containerSelectBoxes = StyleSheet.flatten([
    styles.checkBoxContainer,
    typeInstallments === 'hide_installments' && styles.minHeight,
  ]);

  const renderPrice = useCallback(() => {
    if (typeInstallments === 'show_prime_equal_to_regular' && installmentsEqualPrime) {
      return installmentsEqualPrime?.value || 0;
    }

    if (!showInstallments) {
      return price;
    }

    return installmentsPrice;
  }, [installmentsEqualPrime, installmentsPrice, price, showInstallments, typeInstallments]);

  const renderInstallments = useCallback(() => {
    if (typeInstallments === 'show_prime_equal_to_regular' && installmentsEqualPrime) {
      return installmentsEqualPrime?.number;
    }

    return installmentsNumber;
  }, [installmentsEqualPrime, installmentsNumber, typeInstallments]);

  return (
    <TouchableOpacity
      style={styles.normalPrice}
      onPress={() => {
        EventProvider.logEvent('normal_price_box_click', {});
        onPress('priceNormal');
      }}
      disabled={isChecked}
      {...testProps('com.usereserva:id/select_box_price_normal')}
    >
      <View style={containerSelectBoxes}>
        <View style={styles.normalCheckBox}>
          {isChecked && (
            <View
              style={styles.normalCheckBoxFill}
              {...testProps('com.usereserva:id/select_box_price_normal_checked')}
            />
          )}
        </View>

        <View style={styles.priceDataWrapper}>
          <Typography
            fontFamily="reservaSansRegular"
            style={styles.normalTextGray}
          >
            Preço Normal
          </Typography>

          {showInstallments && (
            <View style={styles.priceContainer}>
              {showInstallments && (
              <Typography
                fontFamily="reservaSansRegular"
                style={styles.normalText}
              >
                {renderInstallments()}
                x
                {' '}
              </Typography>
              )}
              <Typography
                style={styles.integerPart}
                fontFamily="reservaSansRegular"
              >
                R$
                {' '}
                {`${integerPart(renderPrice())},`}
              </Typography>
              <Typography
                style={styles.decimalPart}
                fontFamily="reservaSansRegular"
              >
                {decimalPart(renderPrice())}
              </Typography>
            </View>
          )}
        </View>

        <View style={separator} />

        <View style={styles.priceDataWrapper}>
          <View style={pricesWrapper}>
            <Typography
              style={[styles.integerPart, styles.normalTextBlack]}
              fontFamily="reservaSansRegular"
            >
              R$
              {' '}
              {`${integerPart(price)},`}
            </Typography>
            <Typography
              style={styles.normalTextBlack}
              fontWeight="bold"
              fontFamily="reservaSansRegular"
            >
              {decimalPart(price)}
            </Typography>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
}
