import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import IconCheck from '../../../../../assets/icons/IconCheck';

interface ShowcaseDrawerProps {
  data: IRsvProduct;
}

export default function ShowcaseDrawerContent({ data }: ShowcaseDrawerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState(data.prices.salePrice || 0);
  const [loading, setLoading] = useState(false);

  const { actions, items } = useBagStore(['actions', 'items']);
  const { onFavorite, favorites, onUnfavorite } = useWishlistStore(['onFavorite', 'favorites', 'onUnfavorite']);

  const onAddToCart = useCallback(async () => {
    setLoading(true);
    const orderFormItem = items.find((item) => item.id === data.sku[0]?.sizes[0]?.skuId);

    if (selectedSize === null) {
      Alert.alert('Erro', 'Selecione um tamanho para continuar!', [
        {
          text: 'Fechar',
          onPress: () => {},
        },
      ]);

      setLoading(false);
      return;
    }

    await actions.ADD_ITEM(
      '1',
      data.sku[0]?.sizes[0]?.skuId || '',
      orderFormItem ? orderFormItem.quantity + 1 : 1,
    );

    setLoading(false);
  }, [selectedSize]);

  const onSelectColor = useCallback((colorID: string) => {
    setSelectedColor(colorID);
  }, []);

  const onSelectSize = useCallback((sizeID: string) => {
    setSelectedSize(sizeID);
  }, []);

  const onSelectPrice = useCallback((price: number) => {
    setSelectedPrice(price);
  }, []);

  const checkWishlist = useCallback((skuId: string) => (
    favorites.includes(skuId)
  ), [favorites]);

  const onAddToWishlist = useCallback(async () => {
    const isFavorite = checkWishlist(data.sku[0]?.sizes[0]?.skuId || '0');

    if (isFavorite) {
      await onUnfavorite({
        productId: data.productId,
        skuId: data.sku[0]?.sizes[0]?.skuId || '0',
        brand: data.brand,
        lowPrice: data.prices.salePrice,
        productName: data.productName,
      });

      return;
    }

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
        {data.flags.map((flag) => (
          <View key={flag.value}>
            {flag.type === 'savings' && (
              <View style={styles.flagContainer}>
                <Text style={styles.flagTitle}>{`${flag.value}%`}</Text>
                <Text style={styles.discountFlagTitle}>Off</Text>
              </View>
            )}
          </View>
        ))}
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
          <TouchableOpacity
            onPress={() => onSelectColor(data.sku[0]?.colorRefId || '0')}
            style={[
              styles.listColorsProductItem,
              { backgroundColor: data.sku[0]?.colorHex || COLORS.WHITE }]}
          >
            {selectedColor !== null && (
              <IconCheck />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Tamanho:</Text>
        <View style={styles.listColorsProductContent}>
          {data.sku[0]?.sizes.map((size) => (
            <TouchableOpacity
              onPress={() => onSelectSize(size.skuId)}
              key={size.skuId}
              style={[styles.listColorsProductItem,
                {
                  backgroundColor: selectedSize !== null
                  && selectedSize === size.skuId ? COLORS.BLACK : COLORS.WHITE,
                }]}
              disabled={size.disabled}
            >
              {size.disabled && (
                <View style={styles.contentAbsolute}>
                  <IconLineBlock />
                </View>
              )}
              <Text style={[styles.listSizesProductItemText,
                {
                  color: selectedSize !== null
                  && selectedSize === size.skuId ? COLORS.WHITE : COLORS.BLACK,
                }]}
              >
                {size.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Preço:</Text>

        <View style={styles.row}>
          <View style={[styles.row, { alignItems: 'center' }]}>
            {/* <TouchableOpacity
              onPress={() => onSelectPrice(data.prices.salePrice)}
              style={styles.radionButtonContainer}
            >
              {selectedPrice === data.prices.salePrice && (
                <View
                  style={styles.radioButtonContent}
                />
              )}
            </TouchableOpacity> */}
            <Text>
              <Text style={[styles.productCurrencyLabel,
                { color: COLORS.BLACK }]}
              >
                R$
                {' '}
              </Text>
            </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.BLACK }]}>
              {`${integerPart(data.prices.salePrice || 0)},`}
            </Text>
            <Text style={[styles.productPriceCentsLabel, { color: COLORS.BLACK, marginTop: -3 }]}>
              {`${decimalPart(data.prices.salePrice || 0)}`}
            </Text>
          </View>
          <View style={[styles.row, { marginLeft: 10, alignItems: 'center' }]}>
            <Text style={[styles.productCurrencyLabel, { color: COLORS.SHELF_GRAY, textDecorationLine: 'line-through' }]}>R$ </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.SHELF_GRAY, textDecorationLine: 'line-through' }]}>
              {`${integerPart(data.prices.listPrice || 0)},`}
            </Text>
            <Text style={[styles.productPriceCentsLabel, { color: COLORS.SHELF_GRAY, textDecorationLine: 'line-through', marginTop: -3 }]}>
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
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.WHITE} />
            ) : (
              <Text style={styles.textButtonAddToBag}>ADICIONAR À SACOLA</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
