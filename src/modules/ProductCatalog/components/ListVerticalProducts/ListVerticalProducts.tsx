import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Button, ProductVerticalListCard, Typography } from 'reserva-ui';
import { ProductQL, Property, SKU } from '../../../../graphql/products/productSearch';
import { ProductUtils } from '../../../../shared/utils/productUtils';
import { Product } from '../../../../store/ducks/product/types';
import { CreateCategoryModal } from '../CategoryModals/CategoryModals';
import wishListQueries from '../../../../graphql/wishlist/wishList';
import { removeWishlist } from '../../../../store/ducks/wishlist/actions';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { Alert } from 'react-native';
interface ListProductsProps {
  products: ProductQL[];
  horizontal?: boolean;
  loadMoreProducts: (offSet: number) => void;
  loadingHandler?: (loadingState: boolean) => void;
  listHeader?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
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
  loadMoreProducts,
  loadingHandler
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [favoritedProduct, setFavoritedProduct] = useState<Product>();
  const [isVisible, setIsVisible] = useState(false);
  const [productList, setProductList] = useState<ProductQL[]>([]);
  const [skip, setSkip] = useState(false);
  const [loading, setLoading] = useState(true)
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([])
  const [favorites, setFavorites] = useState<any[]>([])

  const { email } = useAuth()

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  const { refetch: refetchFavorite } = useQuery(wishListQueries.CHECK_LIST, {
    skip,
  });

  const { data: productIds, loading: loadingWishlist, error, refetch: refetchWishlist } = useQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email
    },
    skip
  })

  const [addWishList, { data: addWishListData, error: addWishListError, loading: addWishLoading }] = useMutation(wishListQueries.ADD_WISH_LIST)
  const [removeWishList, { data: removeWishListData, error: removeWishListError, loading: removeWishLoading }] = useMutation(wishListQueries.REMOVE_WISH_LIST)

  const resizeImage = (imageUrl: string) => {
    let urlArray = imageUrl.split("/")
    urlArray[urlArray.length - 2] = `${urlArray[urlArray.length - 2]}-500-750`;
    return urlArray.join("/")
  }

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    setLoadingFavorite([...loadingFavorite, item.productId])
    const { productId, listId } = item
    if (!!email) {
      if (favorite) {
        const { data } = await addWishList({
          variables: {
            shopperId: email,
            productId: productId
          }
        })
        setFavorites([...favorites, { productId, listId: data.addToList }])
      } else {

        await removeWishList({
          variables: {
            shopperId: email,
            id: favorites.find(x => x.productId == productId).listId
          }
        })
        setFavorites([...favorites.filter(x => x.productId != productId)])
      }
      setLoading(false)
      await populateListWithFavorite()
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' })
    }
    setLoadingFavorite([...loadingFavorite.filter(x => x != item.productId)])
  }

  const populateWishlist = async () => {
    setSkip(true);

    const { data: { viewList: { data: wishlist } } } = await refetchWishlist({ shopperId: email })
    setFavorites([...wishlist.map((x: any) => { return { productId: x.productId, listId: x.id } })])

  }

  const populateListWithFavorite = async () => {
    setLoading(true)
    if (!!email) {
      if (products && products.length > 0) {
        await populateWishlist()
      }
    }
    Promise.all(products).then((res) => setProductList(res));
    setLoading(false)
  };

  useEffect(() => {

    populateListWithFavorite();
  }, [products]);

  useFocusEffect(useCallback(() => {
    populateListWithFavorite()
  }, [])
  )

  return (
    <>
      <CreateCategoryModal
        isVisible={isVisible}
        favoritedProduct={favoritedProduct}
      />
      {productList.length > 0 || loading ? (
        <FlatList
          horizontal={horizontal}
          data={productList}
          keyExtractor={(item) => item.productId}
          numColumns={horizontal ? 1 : 2}
          onEndReached={() => loadMoreProducts(products.length)}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={listHeader}
          renderItem={({ item, index }) => {
            const installments =
              item.items[0].sellers[0].commertialOffer.Installments;
            const installmentsNumber =
              installments.length > 0
                ? installments[0].NumberOfInstallments
                : 1;

            const installmentPrice =
              installments.length > 0
                ? installments[0].Value
                : item.priceRange?.listPrice?.lowPrice;
            const colors = new ProductUtils().getColorsArray(item);
            return (
              <Box
                flex={1}
                alignItems="center"
                justifyContent="center"
                height={353}
                mr={horizontal && "xxxs"}
              >
                <ProductVerticalListCard
                  loadingFavorite={!!loadingFavorite.find(x => x == item.productId)}
                  isFavorited={!!favorites.find(x => x.productId == item.productId)}//item.isFavorite}
                  onClickFavorite={(isFavorite) => {
                    // setLoafingFavorite([...loadingFavorite, item.productId])
                    handleOnFavorite(isFavorite, item)
                    // setLoafingFavorite([...loadingFavorite.filter(x => x != item.productId)])

                  }}
                  colors={colors}
                  imageSource={item.items[0].images[0].imageUrl}
                  installmentsNumber={installmentsNumber} //numero de parcelas
                  installmentsPrice={installmentPrice || 0} //valor das parcelas
                  currency="R$"
                  discountTag={getPercent(
                    item.priceRange?.sellingPrice.lowPrice,
                    item.priceRange?.listPrice.lowPrice
                  )}
                  priceWithDiscount={item.priceRange?.sellingPrice.lowPrice}
                  price={item.priceRange?.listPrice?.lowPrice || 0}
                  productTitle={item.productName}
                  onClickImage={() => {
                    navigation.navigate('ProductDetail', {
                      productId: item.productId,
                      colorSelected: item.items[0].variations[2].values[0]
                    });
                  }}
                />
              </Box>
            );
          }}
        />
      )
        :
        <Box justifyContent='center' alignContent='center' mt={163}>
          <Typography
            textAlign='center'
            fontFamily='reservaSerifMedium'
            fontSize={20}>
            Ops...desculpe
          </Typography>
          <Box mx={39} mt='nano'>
            <Typography
              textAlign='center'
              fontFamily='nunitoSemiBold'
              fontSize={13}>
              A página que você procura está temporariamente indisponível ou foi removida
            </Typography>
          </Box>
          <Button
            title='VOLTAR'
            onPress={() => {
              navigation.goBack()
            }}
            variant='primarioEstreitoOutline'
            mx={22}
            mt={49}
            inline />
        </Box>
      }
    </>
  );
};
