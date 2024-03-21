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
import { decimalPart, integerPart } from '../../../Bag/components/ProductListItem/ProductListItemDiscount.utils';
import { styles } from './ShowcaseDrawerContent.styles';
import { COLORS, FONTS } from '../../../../base/styles';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import useWishlistStore from '../../../../zustand/useWishlistStore';
import { getProductLoadType } from '../../../ProductDetail/utils/getProductLoadType';
import { useProductLazyQuery, type ProductQuery } from '../../../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import IconAddToFavorite from '../../../../../assets/icons/IconAddToFavorite';
import IconPrime from '../../../../../assets/icons/IconPrime';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import { ModalSignIn } from '../../../../components/ModalSignIn';
import { usePrimeStore } from '../../../../zustand/usePrimeStore/usePrimeStore';

interface ShowcaseDrawerProps {
  productData: IRsvProduct;
}

export default function ShowcaseDrawerContent({ productData }: ShowcaseDrawerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductQuery['product'] | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = useState(productData.prices.salePrice || 0);
  const [productSizes, setProductSizes] = useState<any>([]);
  const [priceTypeSelected, setPriceTypeSelected] = useState('');
  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const [onLoading, setOnLoading] = useState(false);

  const { actions, items } = useBagStore(['actions', 'items']);
  const { profile } = useAuthStore(['profile']);
  const {
    changeStateAnimationBag,
  } = usePrimeStore([
    'changeStateAnimationBag',
  ]);
  const { isPrime } = usePrimeInfo();
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
    setProductSizes(sizes?.sizes);
  }, [product]);

  const onSelectSize = useCallback((sizeID: string) => {
    setSelectedSize(sizeID);
  }, []);

  const onSelectPrice = useCallback((price: number, priceType: string) => {
    if (priceType === 'prime') {
      setPriceTypeSelected(priceType);

      if (!profile?.isPrime && !isPrime) {
        setIsModalSignInVisible(true);
      }

      return;
    }

    setPriceTypeSelected(priceType);
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

      if (data?.product) {
        setProduct(data.product);
      }
    } catch (err) {
      ExceptionProvider.captureException(err);
    }
  }, [getProduct]);

  const handleOnModalHideSignIn = useCallback(() => {
    if (isPrime) {
      changeStateAnimationBag(true);
    }
  }, [changeStateAnimationBag, isPrime]);

  useEffect(() => {
    onLoadProduct();
    setProductSizes(product?.colors[0]?.sizes || []);
  }, [onLoadProduct, product]);

  return (
    <View style={styles.container}>
      <ModalSignIn
        isVisible={isModalSignInVisible}
        onClose={() => setIsModalSignInVisible(false)}
        onModalHide={handleOnModalHideSignIn}
      />
      <View style={styles.row}>
        <Image source={{ uri: productData.image }} style={styles.productImage} />
        <View style={{ position: 'absolute', top: 190 }}>
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
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.productTitle}>{productData.productName}</Text>

          <TouchableOpacity>
            <Text style={{ textDecorationLine: 'underline', fontFamily: FONTS.WORK_SANS_REGULAR, fontSize: 10 }}>Ver página do produto</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Cor:</Text>
          <FlatList
            data={product?.colors}
            keyExtractor={(item) => String(item.colorId)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelectColor(item.colorId || '0')}
                style={[styles.listColorsContainer, {
                  borderColor: selectedColor === item.colorId
                    ? COLORS.BLACK : COLORS.COLOR_SELECTOR_GRAY,
                }]}
              >
                <Image
                  source={{ uri: item.colorUrl }}
                  style={[
                    styles.listColorsProductItem,
                    { opacity: item.disabled ? 1 : 1 },
                  ]}
                />
              </TouchableOpacity>
            )}
          />

          <Text style={styles.label}>Tamanho:</Text>
          <FlatList
            data={productSizes}
            keyExtractor={(item) => String(item.skuName)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onSelectSize(item.itemId)}
                disabled={item.disabled}
                style={[styles.listSizesItem,
                  {
                    backgroundColor: selectedSize === item.itemId ? COLORS.BLACK : COLORS.WHITE,
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

          {productData.flags.map((flag) => (
            <View key={flag.type}>
              {flag.type === 'cashback' && (
                <View
                  style={{
                    backgroundColor: COLORS.BACKGROUND_LICHT_GRAY,
                    padding: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginTop: 15,
                    flexDirection: 'row',
                  }}
                >
                  <Text style={[
                    styles.flagTitle,
                    { color: COLORS.BLACK, fontFamily: FONTS.WORK_SANS_BOLD }]}
                  >
                    {`Ganhe ${flag.value}%`}
                    {' '}
                  </Text>
                  <Text style={[
                    styles.flagTitle,
                    { color: COLORS.BLACK, fontFamily: FONTS.WORK_SANS_REGULAR },
                  ]}
                  >
                    de Cashback
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 5 }}>
        <Text style={styles.label}>Preço:</Text>
        <View style={styles.row}>
          <View style={{ width: '45%', flexDirection: 'row' }}>
            {/* <TouchableOpacity
              onPress={() => onSelectPrice(productData.prices.salePrice, 'normalPrice')}
              style={{
                borderWidth: 1,
                width: 25,
                height: 25,
                borderRadius: 40,
                marginRight: 5,
                borderColor: COLORS.COLOR_SELECTOR_GRAY,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: priceTypeSelected === 'normalPrice' ? COLORS.BLACK : '#fff',
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity> */}
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

          {/* <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: COLORS.COLOR_SELECTOR_GRAY }}>|</Text>
          </View>

          <View style={[styles.row, { alignItems: 'center', width: '40%' }]}>
            <TouchableOpacity
              onPress={() => onSelectPrice(productData.prices.salePrice, 'prime')}
              style={{
                borderWidth: 1,
                width: 25,
                height: 25,
                borderRadius: 40,
                marginRight: 5,
                borderColor: COLORS.PRIME_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: priceTypeSelected === 'prime' && isPrime ? COLORS.PRIME_COLOR : '#fff',
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
            <Text>
              <Text style={[styles.productCurrencyLabel,
                { color: COLORS.PRIME_COLOR }]}
              >
                R$
                {' '}
              </Text>
            </Text>
            <Text style={[styles.productListPriceLabel, { color: COLORS.PRIME_COLOR }]}>
              {`${integerPart(productData.prices.salePrice || 0)},`}
            </Text>
            <Text style={[
              styles.productPriceCentsLabel, { color: COLORS.PRIME_COLOR, marginTop: -3 }]}
            >
              {`${decimalPart(productData.prices.salePrice || 0)}`}
            </Text>
            <View style={{ marginLeft: 15 }}>
              <IconPrime />
            </View>
          </View> */}
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
    </View>
  );
}
