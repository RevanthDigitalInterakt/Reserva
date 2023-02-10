import { useMutation, useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  ProductVerticalListCard,
  ProductVerticalListCardProps,
  Typography,
} from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';
import remoteConfig from '@react-native-firebase/remote-config';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { images } from '../../../../assets';
import { useAuth } from '../../../../context/AuthContext';
import type { ProductQL } from '../../../../graphql/products/productSearch';
import wishListQueries from '../../../../graphql/wishlist/wishList';
import { CreateCategoryModal } from '../CategoryModals/CategoryModals';
import { slugify } from '../../../../utils/slugify';
import EventProvider from '../../../../utils/EventProvider';
import { getItemPrice } from '../../../../utils/getItemPrice';
import { getPercent } from '../../../../utils/getPercent';

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

export const ListVerticalProducts = ({
  products,
  horizontal,
  listHeader,
  isLoading,
  loadMoreProducts,
  totalProducts,
  handleScrollToTheTop,
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [favoritedProduct, setFavoritedProduct] = useState<any>();
  const [isVisible, setIsVisible] = useState(false);
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

  const [addWishList] = useMutation(wishListQueries.ADD_WISH_LIST);

  const [getWishList] = useLazyQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [removeWishList] = useMutation(wishListQueries.REMOVE_WISH_LIST);

  const populateListWithFavorite = async () => {
    setLoading(true);
    setLoading(false);
  };

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    const skuId = item.items[0].itemId;
    setLoadingFavorite([...loadingFavorite, skuId]);
    const { productId } = item;
    if (email) {
      if (favorite) {
        const { data } = await addWishList({
          variables: {
            shopperId: email,
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
            shopperId: email,
            id: favorites.find((x) => x.productId == productId).listId,
          },
        });

        if (data) {
          setFavorites([...favorites.filter((x) => x.sku !== skuId)]);
        }
      }
      setLoading(false);
      await populateListWithFavorite();
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' });
    }
    setLoadingFavorite([...loadingFavorite.filter((x) => x != skuId)]);
  };

  const populateWishlist = async () => {
    setSkip(true);

    const {
      data: {
        viewList: { data: wishlist },
      },
    } = await getWishList({ variables: { shopperId: email } });

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

      {products && products.length > 0 && (
        <>
          <FlatList
            horizontal={horizontal}
            data={products}
            bounces={false}
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

              return (
                <ProductItem
                  item={item}
                  index={index}
                  horizontal={horizontal}
                  loadingFavorite={
                    !!loadingFavorite.find((x) => x == item?.items[0]?.itemId)
                  }
                  isFavorited={
                    !!favorites.find((x) => x.sku == item?.items[0]?.itemId)
                  }
                  onClickFavorite={(isFavorite) => {
                    handleOnFavorite(isFavorite, item);
                  }}
                  imageSource={item?.items[0]?.images[0]?.imageUrl}
                  installmentsNumber={
                    installmentsNumber?.NumberOfInstallments || 1
                  }
                  installmentsPrice={
                    installmentPrice?.Value || cashPaymentPrice || 0
                  }
                  currency="R$"
                  discountTag={getPercent(sellingPrice, listPrice)}
                  saleOff={getSaleOff(item)}
                  priceWithDiscount={sellingPrice}
                  price={listPrice || 0}
                  productTitle={item.productName}
                  testID={`productcard_vertical_${slugify(item.productId)}`}
                  onClickImage={() => {
                    EventProvider.logEvent('select_item', {
                      item_list_id: item?.productId,
                      item_list_name: item?.productName,
                    });

                    navigation.navigate('ProductDetail', {
                      skuId: item?.items[0]?.itemId,
                    });

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
}

const ProductItem: React.FC<ProductItemInterface> = ({
  item,
  index,
  horizontal,
  testID,
  ...props
}) => (
  <Box
    flex={1}
    alignItems="center"
    justifyContent="center"
    height={353}
    mr={horizontal && 'xxxs'}
  >
    {!!item?.items[0]?.images[0]?.imageUrl && (
      <ProductVerticalListCard
        {...props}
        testID={testID}
        imageSource={item?.items[0]?.images[0]?.imageUrl}
      />
    )}
  </Box>
);
