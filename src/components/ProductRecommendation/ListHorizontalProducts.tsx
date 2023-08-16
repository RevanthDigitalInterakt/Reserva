/* eslint-disable @typescript-eslint/no-use-before-define */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Animated, Dimensions } from 'react-native';

import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import images from '../../base/styles/icons';
import type { ProductQL } from '../../graphql/products/productSearch';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { getDitoUserID } from '../../utils/Dito/src/utils/getDitoUserID';
import EventProvider from '../../utils/EventProvider';
import { createNavigateToProductParams } from '../../utils/createNavigateToProductParams';
import { defaultBrand } from '../../utils/defaultWBrand';
import { getBrandByUrl } from '../../utils/getBrandByURL';
import { getCategoriesByHref } from '../../utils/getCategoriesByHref';
import { getPercent } from '../../utils/getPercent';
import { getProductColor } from '../../utils/getProductColor';
import { getProductSize } from '../../utils/getProductSize';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { ProductVerticalListCard, type ProductVerticalListCardProps } from '../ProductVerticalListCard';
import { Typography } from '../Typography/Typography';

interface ListProductsProps {
  products: ProductQL[];
  horizontal?: boolean;
  listHeader?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  handleScrollToTheTop?: () => void;
}

const { width } = Dimensions.get('window');

export function ListHorizontalProducts({
  products,
  horizontal,
  listHeader,
  handleScrollToTheTop,
}: ListProductsProps) {
  const { getBoolean } = useRemoteConfig();
  const navigation = useNavigation();
  const [skip, setSkip] = useState(false);
  const [saleOffTag, setSaleOffTag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const { profile } = useAuthStore(['profile']);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const populateListWithFavorite = async () => {
    setLoading(true);
    setLoading(false);
  };

  const trackEventDitoAddWishlist = useCallback(async (item: any) => {
    try {
      const id = await getDitoUserID(profile?.email || '');

      EventProvider.sendTrackEvent('adicionou-produto-a-wishlist', {
        id,
        action: 'adicionou-produto-a-wishlist',
        data: {
          id_produto: item.items[0].itemId,
          cor: getProductColor(item.items[0].variations),
          tamanho: getProductSize(item.items[0].variations),
          categorias_produto: item.categoryTree ? getCategoriesByHref(item.categoryTree[3].href) : 'Reserva',
          nome_produto: item.productName,
          marca: item.categoryTree ? getCategoriesByHref(item.categoryTree[0].href).toUpperCase() : 'Reserva',
          preco_produto: item.priceRange.sellingPrice.lowPrice,
          origem: 'app',
        },
      });
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, [profile?.email]);

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    const skuId = item.items[0].itemId;
    setLoadingFavorite([...loadingFavorite, skuId]);
    const { productId } = item;

    if (profile?.email) {
      if (favorite) {
        const handleFavorites = [...favorites, { productId, sku: skuId }];
        await AsyncStorage.setItem(
          '@WishData',
          JSON.stringify(handleFavorites),
        );
        setFavorites(handleFavorites);
        trackEventDitoAddWishlist(item);
      } else {
        const newWishIds = favorites.filter((x) => x.sku !== skuId);
        AsyncStorage.setItem('@WishData', JSON.stringify(newWishIds));
        setFavorites([...favorites.filter((x) => x.sku !== skuId)]);
      }
      setLoading(false);
      await populateListWithFavorite();
    } else {
      // @ts-ignore
      navigation.navigate('Login', { comeFrom: 'Menu' });
    }
    setLoadingFavorite([...loadingFavorite.filter((x) => x !== skuId)]);
  };

  const getVariant = (variants: any, getVariantId: string) => variants.filter(
    (v: any) => v.name === getVariantId,
  )[0].values[0];

  const populateWishlist = async () => {
    setSkip(true);

    const wishData: any = await AsyncStorage.getItem('@WishData');

    if (wishData) {
      setFavorites([
        ...JSON.parse(wishData).map((x: any) => ({
          productId: x.productId,
          listId: x.id,
          sku: x.sku,
        })),
      ]);
    }
  };

  useEffect(() => {
    populateListWithFavorite();
    populateWishlist();
  }, [products]);

  useFocusEffect(
    useCallback(() => {
      populateListWithFavorite();
      populateWishlist();
    }, []),
  );

  useEffect(() => {
    const value = getBoolean('sale_off_tag');
    setSaleOffTag(value);
  }, [getBoolean]);

  const getSaleOff = (salOff) => {
    const idImage = salOff.clusterHighlights?.find((x) => x.id === '371');
    if (!saleOffTag) return null;
    if (idImage) return images.saleOff;
    return null;
  };

  return (
    <>
      {products && products.length === 0 && (
        <Box
          position="absolute"
          flex={1}
          height="100%"
          width="100%"
          zIndex={5}
          justifyContent="center"
          bg="white"
          alignContent="center"
          pt={163}
        >
          <Typography
            textAlign="center"
            fontFamily="reservaSerifMedium"
            fontSize={20}
          >
            Ops...desculpe
          </Typography>
          <Box mx={39} mt="nano">
            <Typography
              textAlign="center"
              fontFamily="nunitoSemiBold"
              fontSize={13}
            >
              A página que você procura está temporariamente indisponível ou foi
              removida
            </Typography>
          </Box>
          <Button
            testID="com.usereserva:id/back_button_home_list_products"
            title="VOLTAR"
            onPress={() => {
              navigation.navigate('Home');
            }}
            variant="primarioEstreitoOutline"
            mx={22}
            mt={49}
            inline
          />
        </Box>
      )}

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={products && products.map((_, index) => index * (width - 10))}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        horizontal={horizontal}
        testID="com.usereserva:id/list_horizontal_products"
        data={products}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        numColumns={horizontal ? 1 : 2}
        ListEmptyComponent={() => (
          <Box height="100%">
            <Typography
              textAlign="center"
              fontFamily="nunitoRegular"
              fontSize={16}
            >
              Produtos não encontrados
            </Typography>
          </Box>
        )}
        ListHeaderComponent={listHeader}
        renderItem={({ item, index }) => {
          let installments;

          let countPosition = 0;
          // TODO refactor
          while (item?.items[0]?.sellers[countPosition]?.commertialOffer?.Installments?.length === 0) {
            countPosition++;
          }

          const listPrice = item?.items[0]?.sellers[countPosition]?.commertialOffer.ListPrice || 0;
          const sellingPrice = item?.items[0]?.sellers[countPosition]?.commertialOffer.Price || 0;

          installments = item?.items[0]?.sellers[countPosition]?.commertialOffer?.Installments;

          const installmentsNumber = installments?.reduce(
            (prev, next) => (prev?.NumberOfInstallments > next?.NumberOfInstallments ? prev : next),
            { NumberOfInstallments: 0, Value: 0 },
          );

          let discountTag;
          if (listPrice && sellingPrice) {
            discountTag = getPercent(
              sellingPrice,
              listPrice,
            );
          }

          const cashPaymentPrice = !!discountTag && discountTag > 0
            ? sellingPrice
            : listPrice || 0;

          const installmentPrice = installments?.reduce(
            (prev, next) => (prev?.NumberOfInstallments > next?.NumberOfInstallments ? prev : next),
            { NumberOfInstallments: 0, Value: 0 },
          );

          return (
            <ProductItem
              item={item}
              index={index}
              horizontal={horizontal}
              loadingFavorite={
                !!loadingFavorite.find((x) => x === item?.items[0]?.itemId)
              }
              isFavorited={
                !!favorites.find((x) => x.sku === item?.items[0]?.itemId)
              }
              onClickFavorite={(isFavorite) => {
                handleOnFavorite(isFavorite, item);
              }}
              imageSource={item?.items[0]?.images[0]?.imageUrl || ''}
              installmentsNumber={installmentsNumber?.NumberOfInstallments || 1}
              installmentsPrice={installmentPrice?.Value || cashPaymentPrice || 0}
              currency="R$"
              discountTag={getPercent(
                sellingPrice,
                listPrice,
              )}
              saleOff={getSaleOff(item)}
              priceWithDiscount={sellingPrice}
              price={listPrice || 0}
              productTitle={item.productName}
              onClickImage={() => {
                EventProvider.logEvent('page_view', {
                  wbrand: defaultBrand.picapau,
                });
                EventProvider.logEvent('select_item', {
                  item_list_id: item?.productId,
                  item_list_name: item?.productName,
                  wbrand: getBrandByUrl(products),
                });

                // @ts-ignore
                navigation.navigate('ProductDetail', createNavigateToProductParams({
                  productId: item.productId,
                  colorSelected: getVariant(item?.items[0]?.variations, 'ID_COR_ORIGINAL'),
                }));

                if (handleScrollToTheTop) {
                  handleScrollToTheTop();
                }
              }}
            />
          );
        }}
      />
      <Box
        flexDirection="row"
        alignSelf="center"
      >
        {Array(3).fill(0).map((key, index) => (
          index !== 0
            ? (
              <Box
                key={key}
                width={8}
                height={8}
                bg="divider"
                borderRadius="xxxs"
                ml="nano"
              />
            )
            : (
              <Box
                key={key}
                width={8}
                height={8}
                bg="divider"
                borderRadius="xxxs"
              />
            )
        ))}
        <Animated.View
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#111',
            borderRadius: 20,
            position: 'absolute',
            transform: [{
              translateX: Animated.divide(scrollX, width * 0.8).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 13],
              }),
            }],
          }}
        />
      </Box>
    </>
  );
}

interface ProductItemInterface extends ProductVerticalListCardProps {
  item: any,
  index: number,
  horizontal?: boolean,
}

function ProductItem({
  item,
  index,
  horizontal,
  ...props
}: ProductItemInterface) {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      height={353}
      mr={horizontal && 'xxxs'}
    >
      {
        item?.items[0]?.images[0]?.imageUrl && (
          <ProductVerticalListCard
            {...props}
            imageSource={item.items[0].images[0].imageUrl}
          />
        )
      }
    </Box>
  );
}
