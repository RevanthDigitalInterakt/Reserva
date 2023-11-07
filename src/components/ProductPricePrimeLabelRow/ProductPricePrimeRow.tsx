import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { integerPart, decimalPart } from '../../utils/numberUtils';
import { styles } from './ProductPricePrimeRow.styles';

interface IProps {
  installments?: { value: number; number: number; };
  currency?: string;
  discountTag?: number;
  priceWithDiscount?: number;
  price: number;
}

const defaultCurrency = 'R$';

function ProductPricePrimeRow({
  installments,
  currency = defaultCurrency,
  discountTag,
  priceWithDiscount,
  price,
}: IProps) {
  const finalPrice = useMemo(() => (
    discountTag && priceWithDiscount ? priceWithDiscount : price
  ), [discountTag, priceWithDiscount, price]);

  const container = StyleSheet.flatten([
    styles.wrapper,
    installments ? styles.start : styles.between,
  ]);

  const flag = StyleSheet.flatten([
    styles.containerPrime,
    installments && styles.ml,
  ]);

  return (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.textPrice}>
          {`${currency} `}
        </Text>

        <Text style={styles.textPrice}>
          {`${integerPart(finalPrice)},`}
        </Text>

        <Text style={styles.textPrice}>
          {`${decimalPart(finalPrice)}`}
        </Text>

        {installments && (
          <>
            <View style={styles.divider} />
            <Text style={[styles.textInstallments, { fontSize: 12 }]}>
              {installments.number}
              x
            </Text>

            <Text style={styles.textInstallments}>
              {` ${currency} ${integerPart(installments.value)},`}
            </Text>

            <Text style={styles.textInstallments}>
              {`${decimalPart(installments.value)}`}
            </Text>
          </>
        )}

        <View style={[flag, { marginLeft: 5 }]}>
          <Text style={styles.labelPrime}>Prime</Text>
        </View>
      </View>
    </View>
  );
}

export default ProductPricePrimeRow;
