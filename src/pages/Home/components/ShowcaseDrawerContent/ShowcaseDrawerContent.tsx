import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
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
import { getProductLoadType } from '../../../ProductDetail/utils/getProductLoadType';
import { useProductLazyQuery, type ProductQuery } from '../../../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

interface ShowcaseDrawerProps {
  productData: IRsvProduct;
}

export default function ShowcaseDrawerContent({ productData }: ShowcaseDrawerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductQuery['product'] | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = useState(productData.prices.salePrice || 0);
  const [productSizes, setProductSizes] = useState<any>([]);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const [onLoading, setOnLoading] = useState(false);

  const { actions, items } = useBagStore(['actions', 'items']);
  const { onFavorite, favorites, onUnfavorite } = useWishlistStore(['onFavorite', 'favorites', 'onUnfavorite']);

  const onAddToCart = useCallback(async () => {
    setOnLoading(true);
    const orderFormItem = items.find((item) => item.id === productData.sku[0]?.sizes[0]?.skuId);

    if (selectedSize === null) {
      Alert.alert('Erro', 'Selecione um tamanho para continuar!', [
        {
          text: 'Fechar',
          onPress: () => {},
        },
      ]);

      setOnLoading(false);
      return;
    }

    await actions.ADD_ITEM(
      '1',
      productData.sku[0]?.sizes[0]?.skuId || '',
      orderFormItem ? orderFormItem.quantity + 1 : 1,
    );

    setOnLoading(false);
  }, [selectedSize]);

  const onSelectColor = useCallback((colorID: string) => {
    setSelectedColor(colorID);
    const sizes = product?.colors.find((x) => x.colorId === colorID);
    console.log(sizes?.sizes[0]);
    setProductSizes(sizes?.sizes);
  }, [product]);

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
    const isFavorite = checkWishlist(productData.sku[0]?.sizes[0]?.skuId || '0');

    if (isFavorite) {
      await onUnfavorite({
        productId: productData.productId,
        skuId: productData.sku[0]?.sizes[0]?.skuId || '0',
        brand: productData.brand,
        lowPrice: productData.prices.salePrice,
        productName: productData.productName,
      });

      return;
    }

    await onFavorite({
      productId: productData.productId,
      skuId: productData.sku[0]?.sizes[0]?.skuId || '0',
      brand: productData.brand,
      lowPrice: productData.prices.salePrice,
      productName: productData.productName,
    });
  }, []);

  const [getProduct] = useProductLazyQuery({
    fetchPolicy: getFetchPolicyPerKey('productDetail'),
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

  const onLoadProduct = useCallback(async () => {
    const params = {
      productId: productData.productId,
      colorSelected: productData.sku[0]?.colorHex || COLORS.WHITE,
      sizeSelected: '',
    };

    try {
      const input = getProductLoadType(params);
      const { data, error } = await getProduct({ variables: { input } });

      if (error || !data?.product) {
        throw new Error(error?.message || 'Ocorreu um erro ao carregar o produto.');
      }

      // console.log(data.product.colors);

      if (data?.product) {
        setProduct(data.product);
      }
    } catch (err) {
      ExceptionProvider.captureException(err);
    }
  }, [getProduct]);

  useEffect(() => {
    onLoadProduct();
  }, [onLoadProduct]);

  return (
    <View style={styles.container}>
      <View>
        {productData.flags.map((flag) => (
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
        <Text style={styles.productTitle}>{productData.productName}</Text>
      </View>

      <FlatList
        horizontal
        keyExtractor={(item) => String(item)}
        data={product?.initialColor?.images || []}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.productImage} />
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* <View style={styles.content}>
        <Image source={{ uri: productData.image }} style={styles.productImage} />
      </View> */}

      <View style={styles.content}>
        <Text style={styles.label}>Cor:</Text>

        <FlatList
          data={product?.colors}
          keyExtractor={(item) => String(item.colorId)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelectColor(item.colorId || '0')}>
              <Image
                source={{ uri: item.colorUrl }}
                style={[
                  styles.listColorsProductItem,
                  { opacity: item.disabled ? 1 : 1 },
                ]}
              />
              {selectedColor === item.colorId && (
                <View style={styles.listColorsContent}>
                  <IconCheck />
                </View>
              )}
            </TouchableOpacity>
          )}
        />

        {/* <View style={styles.listColorsProductContent}>
          <TouchableOpacity
            onPress={() => onSelectColor(productData.sku[0]?.colorRefId || '0')}
            style={[
              styles.listColorsProductItem,
              { backgroundColor: productData.sku[0]?.colorHex || COLORS.WHITE }]}
          >
            {selectedColor !== null && (
              <IconCheck />
            )}
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Tamanho:</Text>
        <FlatList
          data={productSizes}
          keyExtractor={(item) => String(item.skuName)}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectSize(item.itemId)}
              style={[styles.listSizesItem,
                {
                  backgroundColor: selectedColor !== null
                  && selectedSize === item.itemId ? COLORS.BLACK : COLORS.WHITE,
                  opacity: item.disabled ? 0.3 : 1,
                },
              ]}
            >
              <Text style={[styles.listSizesProductItemText,
                {
                  color: selectedSize !== null
                  && selectedSize === item.itemId ? COLORS.WHITE : COLORS.BLACK,
                },
              ]}
              >
                {item.size}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* <View style={styles.listColorsProductContent}>
          {productData.sku[0]?.sizes.map((size) => (
            <TouchableOpacity
              onPress={() => onSelectSize(size.skuId)}
              key={size.skuId}
              style={[styles.listSizesItem,
                {
                  backgroundColor: selectedSize !== null
                  && selectedSize === size.skuId ? COLORS.BLACK : COLORS.WHITE,
                  opacity: size.disabled ? 0.3 : 1,
                }]}
              disabled={size.disabled}
            >
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
        </View> */}
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Preço:</Text>

        <View style={styles.row}>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text>
              <Text style={[styles.productCurrencyLabel,
                { color: COLORS.BLACK }]}
              >
                R$
                {' '}
              </Text>
            </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.BLACK }]}>
              {`${integerPart(productData.prices.salePrice || 0)},`}
            </Text>
            <Text style={[styles.productPriceCentsLabel, { color: COLORS.BLACK, marginTop: -3 }]}>
              {`${decimalPart(productData.prices.salePrice || 0)}`}
            </Text>
          </View>
          <View style={[styles.row, { marginLeft: 10, alignItems: 'center' }]}>
            <Text style={[styles.productCurrencyLabel, { color: COLORS.SHELF_GRAY, textDecorationLine: 'line-through' }]}>R$ </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.SHELF_GRAY, textDecorationLine: 'line-through' }]}>
              {`${integerPart(productData.prices.listPrice || 0)},`}
            </Text>
            <Text style={[styles.productPriceCentsLabel, { color: COLORS.SHELF_GRAY, textDecorationLine: 'line-through', marginTop: -3 }]}>
              {`${decimalPart(productData.prices.listPrice || 0)}`}
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
            {onLoading ? (
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
