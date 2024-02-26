/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/jsx-indent */
import React, { useCallback } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { IRsvProduct } from '../HomeShowcase/HomeShowcase';
import IconLineBlock from '../../../../../assets/icons/IconLineBlock';
import { decimalPart, integerPart } from '../../../Bag/components/ProductListItem/ProductListItemDiscount.utils';
import IconAddToFavorite from '../../../../../assets/icons/IconAddToFavorite';
import { styles } from './ShowcaseDrawerContent.styles';
import { COLORS } from '../../../../base/styles';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import useWishlistStore from '../../../../zustand/useWishlistStore';

interface ShowcaseDrawerProps {
  data: IRsvProduct;
}

export default function ShowcaseDrawerContent({ data }: ShowcaseDrawerProps) {
  const { actions, items } = useBagStore(['actions', 'items']);
  const { onFavorite } = useWishlistStore(['onFavorite']);

  const onAddToCart = useCallback(async () => {
    const orderFormItem = items.find((item) => item.id === data.sku[0]?.sizes[0]?.skuId);

    await actions.ADD_ITEM(
      '1',
      data.sku[0]?.sizes[0]?.skuId || '',
      orderFormItem ? orderFormItem.quantity + 1 : 1,
    );
  }, []);

  const onAddToWishlist = useCallback(async () => {
    await onFavorite({
      productId: data.productId,
      skuId: data.sku[0]?.sizes[0]?.skuId || '0',
      brand: data.brand,
      lowPrice: data.prices.salePrice,
      productName: data.productName,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {data.flags.map((flag) => {
				  if (flag.type === 'savings') {
				    return (
              <View key={flag.value} style={styles.flagContainer}>
                <Text style={styles.flagTitle}>{`${flag.value}%`}</Text>
                <Text style={styles.discountFlagTitle}>Off</Text>
              </View>
				    );
				  }

				  return null;
        })}
      </View>

      <View style={styles.content}>
        <Text style={styles.productTitle}>{data.productName}</Text>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: data.image }} style={styles.productImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Cor:</Text>

        <View style={styles.listColorsProductContent}>
          {['#fff', '#000', '#1c2331'].map((item) => (
            <View
              key={String(Math.random())}
              style={[styles.listColorsProductItem, { backgroundColor: item }]}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Tamanho:</Text>
        <View style={styles.listColorsProductContent}>
          {data.sku[0]?.sizes.map((size) => (
            <TouchableOpacity
              key={size.skuId}
              style={styles.listColorsProductItem}
              disabled={size.disabled}
            >
              {size.disabled && (
                <View style={styles.contentAbsolute}>
                  <IconLineBlock />
                </View>
              )}
              <Text style={styles.listSizesProductItemText}>{size.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Preço:</Text>

        <View style={styles.row}>
          <View style={styles.row}>
            <Text>
              <Text style={[styles.productCurrencyLabel, { color: COLORS.BLACK }]}>R$ </Text>
            </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.BLACK }]}>
              {`${integerPart(data.prices.salePrice || 0)},`}
            </Text>
            <Text style={[styles.productPriceCentsLabel, { color: COLORS.BLACK }]}>
              {`${decimalPart(data.prices.salePrice || 0)}`}
            </Text>
          </View>
          <View style={[styles.row, { marginLeft: 10 }]}>
            <Text style={[styles.productCurrencyLabel, { color: COLORS.SHELF_GRAY }]}>R$ </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.SHELF_GRAY }]}>
              {`${integerPart(data.prices.listPrice || 0)},`}
            </Text>
            <Text style={[styles.productPriceCentsLabel, { color: COLORS.SHELF_GRAY }]}>
              {`${decimalPart(data.prices.listPrice || 0)}`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onAddToWishlist} style={styles.buttonAddToFavorite}>
            <IconAddToFavorite />
          </TouchableOpacity>

          <TouchableOpacity onPress={onAddToCart} style={styles.buttonAddToBag}>
            <Text style={styles.textButtonAddToBag}>ADICIONAR À SACOLA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
