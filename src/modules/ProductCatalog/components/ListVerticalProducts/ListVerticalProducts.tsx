import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, ProductVerticalListCard } from 'reserva-ui';
import { ProductQL } from '../../../../graphql/products/productSearch';
import { ProductUtils } from '../../../../shared/utils/productUtils';
import { Product } from '../../../../store/ducks/product/types';
import { CreateCategoryModal } from '../CategoryModals/CategoryModals';
import wishListQueries from '../../../../graphql/wishlist/wishList';
interface ListProductsProps {
  products: ProductQL[];
  loadMoreProducts: (offSet: number) => void;
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
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [favoritedProduct, setFavoritedProduct] = useState<Product>();
  const [isVisible, setIsVisible] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [skip, setSkip] = useState(false);
  const { refetch: refetchFavorite } = useQuery(wishListQueries.CHECK_LIST, {
    skip,
  });


  useEffect(() => {
    populateListWithFavorite();
  }, [products]);

  const populateListWithFavorite = async () => {
    if (products && products.length > 0) {
      const productList = products.map(async (p) => {
        setSkip(true);
        const { productId } = p;
        const {
          data: { checkList },
        } = await refetchFavorite({
          shopperId: 'erick.fraga@globalsys.com.br',
          productId: productId?.split('-')[0],
        });

        return {
          ...p,
          isFavorite: checkList.inList,
        };
      });

      Promise.all(productList).then((res) => setProductList(res));
    }
  };

  return (
    <>
      <CreateCategoryModal
        isVisible={isVisible}
        favoritedProduct={favoritedProduct}
      />

      {productList.length > 0 && (
        <FlatList
          data={productList}
          keyExtractor={(item) => item.id}
          numColumns={2}
          onEndReached={() => loadMoreProducts(products.length)}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={listHeader}
          renderItem={({ item }) => {
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
