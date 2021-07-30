import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, ProductVerticalListCard, Typography } from 'reserva-ui';
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
  listHeader,
  loadMoreProducts,
  loadingHandler
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [favoritedProduct, setFavoritedProduct] = useState<Product>();
  const [isVisible, setIsVisible] = useState(false);
  const [productList, setProductList] = useState<ProductQL[]>([]);
  const [skip, setSkip] = useState(false);

  const { refetch: refetchFavorite } = useQuery(wishListQueries.CHECK_LIST, {
    skip,
  });

  const [addWishList, { data: addWishListData, error: addWishListError, loading: addWishLoading }] = useMutation(wishListQueries.ADD_WISH_LIST)
  const [removeWishList, { data: removeWishListData, error: removeWishListError, loading: removeWishLoading }] = useMutation(wishListQueries.REMOVE_WISH_LIST)

  const { email } = useAuth()

  const resizeImage = (imageUrl: string) => {
    let urlArray = imageUrl.split("/")
    urlArray[urlArray.length - 2] = `${urlArray[urlArray.length - 2]}-500-750`;    
    return urlArray.join("/")
  } 

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    if (!!email) {
      const { productId, listId } = item
      loadingHandler && loadingHandler(true)
      if (favorite) {
        const { data } = await addWishList({
          variables: {
            shopperId: email,
            productId: productId?.split('-')[0]
          }
        })
      } else {
        await removeWishList({
          variables: {
            shopperId: email,
            id: listId
          }
        })
      }
      loadingHandler && loadingHandler(false)
      await populateListWithFavorite()
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' })
      //Alert.alert('Você precisa se identificar para favoritar um produto!')
    }
  }

  const populateListWithFavorite = async () => {
    if (!!email) {
      loadingHandler && loadingHandler(true)
      if (products && products.length > 0) {
        const productList = products.map(async (p) => {
          setSkip(true);
          const { productId } = p;
          const {
            data: { checkList },
          } = await refetchFavorite({
            shopperId: email,
            productId: productId?.split('-')[0],
          });

          return {
            ...p,
            productId: productId,
            listId: checkList.listIds[0],
            isFavorite: checkList.inList,
          };
        });

        Promise.all(productList).then((res) => setProductList(res));
      }
      loadingHandler && loadingHandler(false)
    } else {
      Promise.all(products).then((res) => setProductList(res));
    }
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
      {productList.length > 0 && (
        <FlatList
          data={productList}
          keyExtractor={(item) => item.productId}
          numColumns={2}
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
            >
              <ProductVerticalListCard
                isFavorited={item.isFavorite}
                onClickFavorite={(isFavorite) => { handleOnFavorite(isFavorite, item) }}
                colors={colors}
                imageSource={resizeImage(item.items[0].images[0].imageUrl)}
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
      )}
    </>
  );
};
