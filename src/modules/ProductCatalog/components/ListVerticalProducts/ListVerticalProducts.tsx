import { useNavigation } from "@react-navigation/core";
import React, { Component, useEffect } from "react";
import { FlatList } from "react-native";
import { Box, Image, ProductVerticalListCard } from "reserva-ui";
import { RootStackParamList } from "../../../../routes/StackNavigator";
import { Product } from "../../../../store/ducks/product/types";

interface ListProductsProps {
  //listHeader: any;
  products: Product[];
  loadMoreProducts: (offSet: number) => void;
  listHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const ListVerticalProducts = ({
  products,
  listHeader,
  loadMoreProducts,
}: ListProductsProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log(products?.length);
  }, []);

  return products?.length > 0 ? (
    <FlatList
      data={products}
      //keyExtractor={(item) => item.id}
      numColumns={2}
      onEndReached={() => loadMoreProducts(products.length)}
      onEndReachedThreshold={0}
      ListHeaderComponent={listHeader}
      renderItem={({ index, item }) => (
        <Box flex={1} alignItems="center" justifyContent="center" height={320}>
          <ProductVerticalListCard
            imageSource={item.imageUrl}
            installmentsNumber={item.installmentNumber}
            discountTag={item.discountTag > 0 ? item.discountTag : undefined}
            installmentsPrice={item.installmentPrice || 0}
            currency={item.currency}
            price={item.fullPrice || 0}
            productTitle={item.title}
            onClickImage={() => {
              navigation.navigate("ProductDetail", {
                productId: item.id,
              });
            }}
          />
        </Box>
      )}
    />
  ) : null;
};
