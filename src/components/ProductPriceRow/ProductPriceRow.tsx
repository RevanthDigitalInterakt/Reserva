import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { integerPart, decimalPart } from '../../utils/numberUtils';
import { styles } from './ProductPriceRow.styles';

interface IPros {
  installments?: { value: number; number: number; };
  currency?: string;
  discountTag?: number;
  priceWithDiscount?: number;
  price: number;
}

function ProductPriceRow({
  installments,
  currency,
  discountTag,
  priceWithDiscount,
  price,
}: IPros) {
  const finalPrice = useMemo(() => (
    discountTag && priceWithDiscount ? priceWithDiscount : price
  ), [discountTag, priceWithDiscount, price]);

  return (
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

      {!!installments?.number && installments.number > 1 && (
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
    </View>
  );
}

export default ProductPriceRow;
