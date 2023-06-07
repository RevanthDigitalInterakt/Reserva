import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { integerPart, decimalPart } from '../../utils/numberUtils';
import { styles } from './ProductPricePrimeRow.styles';

interface IProps {
  installmentsNumber: number;
  currency?: string;
  installmentsPrice: number
  discountTag?: number;
  priceWithDiscount?: number;
  price: number;
}

const defaultCurrency = 'R$';

const ProductPricePrimeRow = ({
  installmentsNumber,
  currency = defaultCurrency,
  installmentsPrice,
  discountTag,
  priceWithDiscount,
  price,
}: IProps) => {
  const finalPrice = useMemo(() => (
    discountTag && priceWithDiscount ? priceWithDiscount : price
  ), [discountTag, priceWithDiscount, price]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
      <View style={styles.containerPrime}>
        <Text style={styles.labelPrime}>Prime</Text>
      </View>

    </View>
  );
};

export default ProductPricePrimeRow;
