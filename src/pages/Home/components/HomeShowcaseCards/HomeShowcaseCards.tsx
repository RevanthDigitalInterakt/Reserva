import React, { useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { trackClickStore, type IData } from '../../../../zustand/useTrackClickStore/useTrackClickStore';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';
import { integerPart, decimalPart } from '../../../../utils/numberUtils';
import { styles } from './HomeShowcaseCards.styles';
import { Skeleton } from '../../../../modules/Checkout/components/Skeleton';
import IconAddToBag from '../../../../../assets/icons/IconAddToBag';
import { COLORS } from '../../../../base/styles';
import { useShelfStore } from '../../../../zustand/useShelfStore/useShelfStore';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';

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
  const { onGetShelfItemData } = useShelfStore(['onGetShelfItemData']);
  const { setDrawerIsOpen } = useProductDetailStore(['setDrawerIsOpen']);
  const { navigate } = useNavigation();

  const newData: IData = {
    identifier: product.productLink || '',
    productId: product.productId,
  };

  const onClickItem = useCallback((data: IRsvProduct) => {
    onGetShelfItemData(data);
    setDrawerIsOpen(true);
  }, [onGetShelfItemData, setDrawerIsOpen]);

  const onClickCard = useCallback((data: IRsvProduct) => {
    trackClickStore.getState().onSendTrackClick(newData, TrackPageTypeEnum.Home);
    // @ts-ignore
    navigate('ProductDetail', { skuId: data.sku[0]?.sizes[0]?.skuId });
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
        {product.productName.length > 18 ? `${product.productName.substring(0, 16).trim()}..` : product.productName}
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
            <View style={styles.discountContainer}>
              <View style={styles.discountContainerFlag} key={flag.type}>
                <Text style={styles.discountFlag}>
                  {`${flag.value}%`}
                </Text>
                <Text style={styles.discountTextFlag}>
                  OFF
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.BLACK,
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => onClickItem(product)}
              >
                <IconAddToBag />
              </TouchableOpacity>
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
