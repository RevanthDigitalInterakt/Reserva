import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { integerPart, decimalPart } from '../../utils/numberUtils';
import { styles } from './ProductPriceRow.styles';

interface IPros {
  installmentsNumber: number;
  currency?: string;
  installmentsPrice: number
  discountTag?: number;
  priceWithDiscount?: number;
  price: number;
}

const ProductPriceRow = ({
  installmentsNumber,
  currency,
  installmentsPrice,
  discountTag,
  priceWithDiscount,
  price,
}: IPros) => {
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

      <View style={styles.divider} />

      <Text style={[styles.textInstallments, { fontSize: 12 }]}>
        {installmentsNumber}
        x
      </Text>
      <Text style={styles.textInstallments}>
        {` ${currency} ${integerPart(installmentsPrice)},`}
      </Text>
      <Text style={styles.textInstallments}>
        {`${decimalPart(installmentsPrice)}`}
      </Text>
    </View>
  );
};

export default ProductPriceRow;
