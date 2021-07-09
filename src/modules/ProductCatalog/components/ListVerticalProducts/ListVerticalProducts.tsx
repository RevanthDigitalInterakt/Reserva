import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, ProductVerticalListCard } from 'reserva-ui';
import { ProductQL } from '../../../../graphql/products/productSearch';
import { ProductUtils } from '../../../../shared/utils/productUtils';
import { Product } from '../../../../store/ducks/product/types';
import { CreateCategoryModal } from '../CategoryModals/CategoryModals';

interface ListProductsProps {
  products: ProductQL[];
  loadMoreProducts: (offSet: number) => void;
  listHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const getColorsInProductSearch = () => {};

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
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [favoritedProduct, setFavoritedProduct] = useState<Product>();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    console.log('products', products);
    //dispatch(setWishlist([]))
  }, []);

  const handleOnFavorite = (prod: Product) => {
    setFavoritedProduct(prod);
    setIsVisible(true);
  };

  return products?.length > 0 ? (
    <>
      <CreateCategoryModal
        isVisible={isVisible}
        favoritedProduct={favoritedProduct}
      />

      <FlatList
        data={products}
        //keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={() => loadMoreProducts(products.length)}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={listHeader}
        renderItem={({ index, item }) => {
          const installments =
            item.items[0].sellers[0].commertialOffer.Installments;
          const installmentsNumber =
            installments.length > 0 ? installments[0].NumberOfInstallments : 1;

          console.log(installmentsNumber);
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
              height={320}
            >
              <ProductVerticalListCard
                colors={colors}
                imageSource={item.items[0].images[0].imageUrl}
                installmentsNumber={installmentsNumber}
                installmentsPrice={installmentPrice}
                currency="R$"
                discountTag={getPercent(
                  item.priceRange?.sellingPrice.lowPrice,
                  item.priceRange?.listPrice.lowPrice
                )}
                priceWithDiscount={item.priceRange?.sellingPrice.lowPrice}
                price={item.priceRange?.listPrice?.lowPrice}
                productTitle={item.productName}
                onClickImage={() => {
                  navigation.navigate('ProductDetail', {
                    productId: item.productId,
                  });
                }}
              />
            </Box>
          );
        }}
      />
    </>
  ) : null;
};
