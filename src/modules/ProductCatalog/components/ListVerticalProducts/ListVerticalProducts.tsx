import { useLazyQuery, useMutation } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Typography,
} from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import LottieView from 'lottie-react-native';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { FlatList } from 'react-native';
import images from '../../../../base/styles/icons';
import { ProductVerticalListCard, ProductVerticalListCardProps } from '../../../../components/ProductVerticalListCard';
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

export function getDefaultSeller(sellers?: any[]) {
  if (!sellers?.length) {
    return undefined;
  }

  const defaultSeller = sellers.find((seller) => seller.sellerDefault === true);
  if (defaultSeller?.sellerId) {
    return defaultSeller.sellerId;
  }

  return sellers[0].sellerId;
}

export const ListVerticalProducts = ({
  cleanFilter,
  products,
  horizontal,
  listHeader,
  isLoading,
  loadMoreProducts,
  totalProducts,
  handleScrollToTheTop,
}: ListProductsProps) => {
  const { getBoolean } = useRemoteConfig();
  const navigation = useNavigation();
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const { profile } = useAuthStore(['profile']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const [addWishList] = useMutation(wishListQueries.ADD_WISH_LIST);

  const [getWishList] = useLazyQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: profile?.email,
    },
  });

  const [removeWishList] = useMutation(wishListQueries.REMOVE_WISH_LIST);

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

  const showThumbColors = useMemo(() => getBoolean('show_pdc_thumb_color'), [getBoolean]);

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
        <>
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
                  isPrime={profile?.isPrime}
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
        </>
      )}
    </>
  );
};

interface ProductItemInterface extends ProductVerticalListCardProps {
  item: any;
  index: number;
  horizontal?: boolean;
  testID: string;
  showThumbColors: boolean;
  colors: string[];
  isPrime: boolean;
}

const ProductItem: React.FC<ProductItemInterface> = ({
  item,
  index,
  horizontal,
  testID,
  showThumbColors,
  isPrime,
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
        isPrime={isPrime}
        showThumbColors={showThumbColors}
        testID={testID}
        imageSource={item?.items[0]?.images[0]?.imageUrl}
      />
    )}
  </Box>
);
