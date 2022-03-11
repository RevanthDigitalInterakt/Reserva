import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Button, ProductVerticalListCard, ProductVerticalListCardProps, Typography } from 'reserva-ui';
import { loadingSpinner } from 'reserva-ui/src/assets/animations';
import { images } from '../../../../assets';
import { useAuth } from '../../../../context/AuthContext';
import {
  ProductQL
} from '../../../../graphql/products/productSearch';
import wishListQueries from '../../../../graphql/wishlist/wishList';
import { ProductUtils } from '../../../../shared/utils/productUtils';
import { CreateCategoryModal } from '../CategoryModals/CategoryModals';



interface ListProductsProps {
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

export const getPercent = (
  sellingPrice: number,
  listPrice: number
): number | undefined => {
  if (sellingPrice === listPrice) {
    return undefined;
  }
  return Math.round(((listPrice - sellingPrice) * 100) / listPrice);
};

export const ListVerticalProducts = ({
  products,
  horizontal,
  listHeader,
  isLoading,
  loadMoreProducts,
  loadingHandler,
  totalProducts,
  handleScrollToTheTop
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [favoritedProduct, setFavoritedProduct] = useState<any>();
  const [isVisible, setIsVisible] = useState(false);
  const [productList, setProductList] = useState<ProductQL[]>([]);
  const [skip, setSkip] = useState(false);
  const [saleOffTag, setSaleOffTag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const { email } = useAuth();

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const { refetch: refetchFavorite } = useQuery(wishListQueries.CHECK_LIST, {
    skip,
  });

  const {
    data: productIds,
    loading: loadingWishlist,
    error,
    refetch: refetchWishlist,
  } = useQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email,
    },
    skip,
  });

  const [
    addWishList,
    { data: addWishListData, error: addWishListError, loading: addWishLoading },
  ] = useMutation(wishListQueries.ADD_WISH_LIST);
  const [
    removeWishList,
    {
      data: removeWishListData,
      error: removeWishListError,
      loading: removeWishLoading,
    },
  ] = useMutation(wishListQueries.REMOVE_WISH_LIST);

  const resizeImage = (imageUrl: string) => {
    const urlArray = imageUrl.split('/');
    urlArray[urlArray.length - 2] = `${urlArray[urlArray.length - 2]}-500-750`;
    return urlArray.join('/');
  };

  const populateListWithFavorite = async () => {
    setLoading(true);
    /*  if (email) {
      if (products && products.length <= 0) {
        await populateWishlist();
      }
    } */
    // Promise.all(products).then((res) => setProductList(res));
    setLoading(false);
  };

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    const skuId = item.items[0].itemId;
    setLoadingFavorite([...loadingFavorite, skuId]);
    const { productId, listId } = item;
    console.log('item', item);
    if (email) {
      if (favorite) {
        /* const { data } = await addWishList({
          variables: {
            shopperId: email,
            productId,
            sku: skuId,
          },
        }); */
        /* setFavorites([
          ...favorites,
          { productId, listId: data.addToList, sku: skuId },
        ]); */
        const handleFavorites = [...favorites, { productId, sku: skuId }];
        await AsyncStorage.setItem(
          '@WishData',
          JSON.stringify(handleFavorites)
        );
        setFavorites(handleFavorites);
      } else {
        /*   await removeWishList({
          variables: {
            shopperId: email,
            id: favorites.find((x) => x.productId == productId).listId,
          },
        }); */
        const newWishIds = favorites.filter((x) => x.sku !== skuId);
        AsyncStorage.setItem('@WishData', JSON.stringify(newWishIds));
        setFavorites([...favorites.filter((x) => x.sku !== skuId)]);
      }
      setLoading(false);
      await populateListWithFavorite();
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' });
    }
    setLoadingFavorite([...loadingFavorite.filter((x) => x != skuId)]);
  };

  const getVariant = (variants: any, getVariantId: string) =>
    variants.filter((v: any) => v.name === getVariantId)[0].values[0];

  const populateWishlist = async () => {
    setSkip(true);

    /* const {
      data: {
        viewList: { data: wishlist },
      },
    } = await refetchWishlist({ shopperId: email }); */

    const wishData: any = await AsyncStorage.getItem('@WishData');

    if (wishData)
      setFavorites([
        ...JSON.parse(wishData).map((x: any) => ({
          productId: x.productId,
          listId: x.id,
          sku: x.sku,
        })),
      ]);
    // await populateListWithFavorite();
  };

  useEffect(() => {
    populateListWithFavorite();
    populateWishlist();
  }, [products]);

  useFocusEffect(
    useCallback(() => {
      populateListWithFavorite();
      populateWishlist();
    }, [])
  );

  useEffect(() => {
    remoteConfig().fetchAndActivate();
    const value = remoteConfig().getValue('sale_off_tag');
    setSaleOffTag(value.asBoolean());
  }, []);

  const getSaleOff = (salOff) => {
    const idImage = salOff.clusterHighlights?.find((x) => x.id === '371');
    if (!saleOffTag) return null;
    if (idImage) return images.saleOff;
  };

  return (
    <>
      <CreateCategoryModal
        isVisible={isVisible}
        favoritedProduct={favoritedProduct}
      />
      {/* {(productList.length > 0 || loading) && !error ? ( */}

      {error && productList.length <= 0 && (
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

      {products && products.length > 0 &&
        <>
          <FlatList
            horizontal={horizontal}
            data={products}
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
              console.log('onEndReached');
              console.log(products.length);
              if (products.length < 96) {
                setIsLoadingMore(true);
                if (totalProducts && totalProducts > products.length) {
                  await loadMoreProducts(products.length);
                }
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
              const installments =
                item.items[0].sellers[0].commertialOffer.Installments;
              const installmentsNumber =
                installments.length > 0
                  ? installments[0].NumberOfInstallments
                  : 1;

              const discountTag = getPercent(
                item.priceRange?.sellingPrice.lowPrice,
                item.priceRange?.listPrice.lowPrice
              );

              const cashPaymentPrice =
                !!discountTag && discountTag > 0
                  ? item.priceRange?.sellingPrice.lowPrice
                  : item.priceRange?.listPrice?.lowPrice || 0;

              const installmentPrice =
                installments.length > 0
                  ? installments[0].Value
                  : cashPaymentPrice;

              // item.priceRange?.listPrice?.lowPrice;
              const colors = new ProductUtils().getColorsArray(item);
              return (
                <ProductItem
                  item={item}
                  index={index}
                  horizontal={horizontal}
                  loadingFavorite={
                    !!loadingFavorite.find((x) => x == item.items[0].itemId)
                  }
                  isFavorited={
                    !!favorites.find((x) => x.sku == item.items[0].itemId)
                  } // item.isFavorite}
                  onClickFavorite={(isFavorite) => {
                    // setLoafingFavorite([...loadingFavorite, item.productId])
                    handleOnFavorite(isFavorite, item);
                    // setLoafingFavorite([...loadingFavorite.filter(x => x != item.productId)])
                  }}
                  // colors={null}
                  imageSource={item.items[0].images[0].imageUrl}
                  installmentsNumber={installmentsNumber} // numero de parcelas
                  installmentsPrice={installmentPrice || 0} // valor das parcelas
                  currency="R$"
                  discountTag={getPercent(
                    item.priceRange?.sellingPrice.lowPrice,
                    item.priceRange?.listPrice.lowPrice
                  )}
                  saleOff={getSaleOff(item)}
                  priceWithDiscount={item.priceRange?.sellingPrice.lowPrice}
                  price={item.priceRange?.listPrice?.lowPrice || 0}
                  productTitle={item.productName}
                  onClickImage={() => {
                    navigation.navigate('ProductDetail', {
                      productId: item.productId,
                      colorSelected: getVariant(
                        item.items[0].variations,
                        'VALOR_HEX_ORIGINAL'
                      ),
                    })

                    if (handleScrollToTheTop) {
                      handleScrollToTheTop()
                    }
                  }}
                />
              );
            }}
          />
        </>
      }
      {/* ) : ( */}

      {/* )} */}
    </>
  );
};


interface ProductItemInterface extends ProductVerticalListCardProps {
  item: any,
  index: number,
  horizontal?: boolean,
}

const ProductItem: React.FC<ProductItemInterface> = ({
  item,
  index,
  horizontal,
  ...props
}) => {

  const [imageUri, setImageUri] = useState<string>()
  // const { fetchImage } = useCacheImages()

  // const fetchUri = async () => {
  //   if (item.items[0].images[0].imageUrl) {
  //     const uri = await fetchImage(item.items[0].images[0].imageUrl);
  //     if (uri) {
  //       setImageUri(uri)
  //     }
  //   }
  // }
  useEffect(() => {
    // if (item) {

    //   fetchImage(item.items[0].images[0].imageUrl).then((uri: string) => {
    //     setImageUri(uri)
    //   });
    // }
    // fetchUri();
  }, []);

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      height={353}
      mr={horizontal && 'xxxs'}
    >
      {
        item.items[0].images[0].imageUrl && (
          <ProductVerticalListCard
            {...props}
            imageSource={item.items[0].images[0].imageUrl}
          />
        )
      }
    </Box>
  );
}

