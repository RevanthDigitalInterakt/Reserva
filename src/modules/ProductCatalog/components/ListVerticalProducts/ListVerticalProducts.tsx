/* eslint-disable @typescript-eslint/no-use-before-define */
import { useLazyQuery, useMutation } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { FlatList } from 'react-native';
import images from '../../../../base/styles/icons';
import { ProductVerticalListCard, type ProductVerticalListCardProps } from '../../../../components/ProductVerticalListCard';
import type { ProductQL } from '../../../../graphql/products/productSearch';
import wishListQueries from '../../../../graphql/wishlist/wishList';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import EventProvider from '../../../../utils/EventProvider';
import { createNavigateToProductParams } from '../../../../utils/createNavigateToProductParams';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { getBrandByUrl } from '../../../../utils/getBrandByURL';
import { getItemPrice } from '../../../../utils/getItemPrice';
import { getPercent } from '../../../../utils/getPercent';
import { slugify } from '../../../../utils/slugify';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import {
  type IGetPrimeReturn,
  getPrime, usePrimeConfig,
} from '../../../../zustand/usePrimeConfig/usePrimeConfig';
import { getProductColor } from '../../../../utils/getProductColor';
import { getProductSize } from '../../../../utils/getProductSize';
import { getCategoriesByHref } from '../../../../utils/getCategoriesByHref';
import { getDitoUserID } from '../../../../utils/Dito/src/utils/getDitoUserID';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';
import { loadingSpinner } from '../../../../../assets/animations';

interface ListProductsProps {
  cleanFilter: () => void;
  products: ProductQL[];
  horizontal?: boolean;
  isLoading?: boolean;
  loadMoreProducts: (offSet: number) => void;
  loadingHandler?: (loadingState: boolean) => void;
  listHeader?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  totalProducts?: number;
  handleScrollToTheTop?: () => void;
}

export function ListVerticalProducts({
  cleanFilter,
  products,
  horizontal,
  listHeader,
  isLoading,
  loadMoreProducts,
  totalProducts,
  handleScrollToTheTop,
}: ListProductsProps) {
  const { getBoolean } = useRemoteConfig();

  const navigation = useNavigation();
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const { profile } = useAuthStore(['profile']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { promo } = usePrimeConfig(['promo']);

  const [addWishList] = useMutation(wishListQueries.ADD_WISH_LIST);

  const [getWishList] = useLazyQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: profile?.email,
    },
  });

  const [removeWishList] = useMutation(wishListQueries.REMOVE_WISH_LIST);

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
          nome_categoria: getCategoriesByHref(item.categoryTree[3].href),
          nome_produto: item.productName,
          marca: getCategoriesByHref(item.categoryTree[0].href).toUpperCase(),
          preco_produto: item.priceRange.sellingPrice.lowPrice,
          origem: 'app',
        },
      });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [profile?.email]);

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    const skuId = item.items[0].itemId;
    setLoadingFavorite([...loadingFavorite, skuId]);
    const { productId } = item;
    if (profile?.email) {
      if (favorite) {
        const { data } = await addWishList({
          variables: {
            shopperId: profile?.email,
            productId,
            sku: skuId,
          },
        });
        if (data) {
          setFavorites([
            ...favorites,
            { productId, listId: data.addToList, sku: skuId },
          ]);
        }

        trackEventDitoAddWishlist(item);
      } else {
        const { data } = await removeWishList({
          variables: {
            shopperId: profile?.email,
            id: favorites.find((x) => x.productId == productId).listId,
          },
        });

        if (data) {
          setFavorites([...favorites.filter((x) => x.sku !== skuId)]);
        }
      }
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' });
    }
    setLoadingFavorite([...loadingFavorite.filter((x) => x != skuId)]);
  };

  const populateWishlist = async () => {
    const {
      data: {
        viewList: { data: wishlist },
      },
    } = await getWishList({
      variables: { shopperId: profile?.email },
      fetchPolicy: getFetchPolicyPerKey('getWishlist'),
      nextFetchPolicy: 'no-cache',
    });

    if (wishlist) {
      setFavorites([
        ...wishlist.map((x: any) => ({
          productId: x.productId,
          listId: x.id,
          sku: x.sku,
        })),
      ]);
    }
  };

  const { primeActive } = usePrimeInfo();

  const showThumbColors = useMemo(() => getBoolean('show_pdc_thumb_color'), [getBoolean]);

  const showPrimePrice = useMemo(() => (
    getBoolean('show_price_prime_pdc') && primeActive
  ), [getBoolean, primeActive]);

  const saleOffTag = useMemo(() => getBoolean('sale_off_tag'), [getBoolean]);

  useEffect(() => {
    populateWishlist();
  }, [products]);

  useFocusEffect(
    useCallback(() => {
      populateWishlist();
    }, []),
  );

  const getSaleOff = (salOff) => {
    const idImage = salOff?.clusterHighlights?.find((x) => x.id === '371');
    if (!saleOffTag) return null;
    if (idImage) return images.saleOff;
  };

  return (
    <>
      {products && products.length <= 0 && (
        <Box
          flex={1}
          height="100%"
          width="100%"
          zIndex={5}
          justifyContent="center"
          bg="white"
          alignContent="center"
          pt={163}
          testID="com.usereserva:id/list_vertical_container_products"
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
            testID="com.usereserva:id/list_vertical_products_back_to_home_button"
            title="VOLTAR"
            onPress={() => {
              navigation.navigate('Home');
              cleanFilter();
            }}
            variant="primarioEstreitoOutline"
            mx={22}
            mt={49}
            inline
          />
        </Box>
      )}

      {products && products.length > 0 && (
        <FlatList
          horizontal={horizontal}
          data={products}
          bounces={false}
          testID="com.usereserva:id/list_vertical_flat_list"
          keyExtractor={(item, index) => `${item.productId} ${index}`}
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
          onEndReached={async () => {
            if (totalProducts) {
              if (products?.length < totalProducts) {
                setIsLoadingMore(true);
                if (totalProducts > products?.length) {
                  await loadMoreProducts(products?.length);
                }
                setIsLoadingMore(false);
              } else {
                setIsLoadingMore(false);
              }
            } else {
              setIsLoadingMore(false);
            }
          }}
          ListFooterComponent={() => {
            if (!(isLoadingMore || isLoading)) return null;
            return (
              <Box
                width="100%"
                height={80}
                color="verdeSucesso"
                justifyContent="center"
                alignItems="center"
              >
                <LottieView
                  source={loadingSpinner}
                  style={{
                    width: 40,
                  }}
                  autoPlay
                  loop
                />
              </Box>
            );
          }}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={listHeader}
          renderItem={({ item, index }) => {
            const {
              listPrice,
              sellingPrice,
              installmentsNumber,
              cashPaymentPrice,
              installmentPrice,
            } = getItemPrice(item.items[0]);

            // prime
            const prime = getPrime(item, promo);

            const product = item.items[0];
            const colors = showThumbColors
              ? (product?.variations || [])
                .filter(({ name, values }) => !!(name === 'VALOR_HEX_ORIGINAL' && values?.length))
                .map(({ values }) => values![0]!)
              : [];

            return (
              <ProductItem
                item={item}
                index={index}
                horizontal={horizontal}
                prime={showPrimePrice ? prime : null}
                loadingFavorite={
                    !!loadingFavorite.find((x) => x === item?.items[0]?.itemId)
                  }
                showThumbColors={showThumbColors}
                colors={colors || []}
                isFavorited={!!favorites.find((x) => x.sku === item.items[0]?.itemId)}
                onClickFavorite={(isFavorite) => {
                  handleOnFavorite(isFavorite, item);
                }}
                imageSource={item?.items[0]?.images[0]?.imageUrl}
                installmentsNumber={installmentsNumber?.NumberOfInstallments || 1}
                installmentsPrice={installmentPrice?.Value || cashPaymentPrice || 0}
                currency="R$"
                discountTag={getPercent(sellingPrice, listPrice)}
                saleOff={getSaleOff(item)}
                priceWithDiscount={sellingPrice}
                price={listPrice || 0}
                productTitle={item.productName}
                testID={`com.usereserva:id/productcard_vertical_${slugify(item.productId)}`}
                onClickImage={() => {
                  EventProvider.logEvent('page_view', {
                    wbrand: defaultBrand.picapau,
                  });
                  EventProvider.logEvent('select_item', {
                    item_list_id: item?.productId,
                    item_list_name: item?.productName,
                    wbrand: getBrandByUrl(products),
                  });

                  navigation.navigate(
                    'ProductDetail',
                    createNavigateToProductParams({ skuId: item?.items[0]?.itemId }),
                  );

                  if (handleScrollToTheTop) {
                    handleScrollToTheTop();
                  }
                }}
              />
            );
          }}
        />
      )}
    </>
  );
}

interface ProductItemInterface extends ProductVerticalListCardProps {
  item: any;
  index: number;
  horizontal?: boolean;
  testID: string;
  showThumbColors: boolean;
  colors: string[];
  prime: IGetPrimeReturn | null
}

const ProductItem: React.FC<ProductItemInterface> = ({
  item,
  index,
  horizontal,
  testID,
  showThumbColors,
  prime,
  ...props
}) => (
  <Box
    flex={1}
    alignItems="center"
    justifyContent="center"
    height={showThumbColors ? 375 : 353}
    mr={horizontal && 'xxxs'}
  >
    {!!item?.items[0]?.images[0]?.imageUrl && (
      <ProductVerticalListCard
        {...props}
        prime={prime}
        showThumbColors={showThumbColors}
        testID={testID}
        imageSource={item?.items[0]?.images[0]?.imageUrl}
      />
    )}
  </Box>
);
