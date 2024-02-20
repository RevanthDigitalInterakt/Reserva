import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { trackClickSmartHintStore } from '../../../../zustand/useTrackClickSmartHint/useTrackClickSmartHint';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';
import { integerPart, decimalPart } from '../../../../utils/numberUtils';
import { styles } from './HomeShowcaseCards.styles';
import { Skeleton } from '../../../../modules/Checkout/components/Skeleton';

interface IRsvFlag {
  type: string;
  value?: number;
  text?: string;
}

interface IRsvSize {
  skuId: string;
  value: string;
  disabled: boolean;
}

interface IRsvSku {
  colorHex: string;
  colorName: string;
  colorRefId: string;
  sizes: IRsvSize[];
}

interface IRsvPrice {
  listPrice: number;
  salePrice: number;
}

interface IRsvProduct {
  productName: string;
  productId: string;
  productLink: string;
  brand: string;
  image: string;
  categoryTree: string[];
  flags: IRsvFlag[];
  sku: IRsvSku[];
  prices: IRsvPrice;
}

interface IHomeShowcaseCardsProps {
  product: IRsvProduct;
}

export function HomeShowcaseCards({ product }: IHomeShowcaseCardsProps) {
  const { navigate } = useNavigation();

  const onClickCard = useCallback((data: IRsvProduct) => {
    trackClickSmartHintStore.getState().onSendTrackClick(product.productId, TrackPageTypeEnum.Home);

    navigate('ProductDetail', { itemId: data.productId, colorSelected: data.sku[0]?.colorHex || '#000000', sizeSelected: data.sku[0]?.sizes[0]?.value || 'P' });
  }, []);

  if (!product) {
    return (
      <Skeleton>
        <View style={styles.cardContainer}>
          <View style={[styles.productImage, { backgroundColor: '#DDD' }]} />
          <Text style={[styles.productName, { backgroundColor: '#DDD' }]} />
          <View style={[styles.priceContainer, { backgroundColor: '#DDD' }]}>
            <Text style={[styles.salePrice, { backgroundColor: '#DDD' }]} />
            <Text style={[styles.decimalPart, { backgroundColor: '#DDD' }]} />
            <Text style={[styles.listPrice, { backgroundColor: '#DDD' }]} />
            <Text style={[styles.listPriceDecimal, { backgroundColor: '#DDD' }]} />
          </View>
        </View>
      </Skeleton>
    );
  }

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onClickCard(product)}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>
        {product.productName.length > 24 ? `${product.productName.substring(0, 22).trim()}..` : product.productName}
      </Text>
      <View style={styles.priceContainer}>
        {product.prices.salePrice !== 0 ? (
          <>
            <Text style={styles.salePrice}>
              {`R$ ${integerPart(product.prices.salePrice || 0)}`}
            </Text>
            <Text style={styles.decimalPart}>
              {`,${decimalPart(product.prices.salePrice || 0)}`}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.salePrice}>
              {`R$ ${integerPart(product.prices.listPrice || 0)}`}
            </Text>
            <Text style={styles.decimalPart}>
              {`,${decimalPart(product.prices.listPrice || 0)}`}
            </Text>
          </>
        )}
        {product.prices.salePrice !== 0 ? (
          <>
            <Text style={styles.listPrice}>
              {`${integerPart(product.prices.listPrice || 0)}`}
            </Text>
            <Text style={styles.listPriceDecimal}>
              {`,${decimalPart(product.prices.listPrice || 0)}`}
            </Text>
          </>
        ) : null}
      </View>
      {product.flags.map((flag) => {
        if (flag.type === 'savings') {
          return (
            <View style={styles.discountContainerFlag} key={flag.type}>
              <Text style={styles.discountFlag}>
                {`${flag.value}%`}
              </Text>
              <Text style={styles.discountTextFlag}>
                OFF
              </Text>
            </View>
          );
        }
        if (flag.type === 'cashback') {
          return (
            <View style={styles.cashbackContainerFlag} key={flag.type}>
              <Text style={styles.cashbackFlag}>
                {`Ganhe ${flag.value}%`}
              </Text>
              <Text style={styles.cashbackTextFlag}>
                {' de cashback'}
              </Text>
            </View>
          );
        }
        return null;
      })}
    </TouchableOpacity>
  );
}
