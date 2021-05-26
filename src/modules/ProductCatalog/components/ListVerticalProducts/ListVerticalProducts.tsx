import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, ProductVerticalListCard } from "reserva-ui";
import { Product } from "../../../../store/ducks/product/types";

interface ListProductsProps {
  //listHeader: any;
  loading: boolean;
  products: Product[];
  loadMoreProducts: (offSet: number) => void;
  listHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const ListVerticalProducts = ({
  loading,
  products,
  listHeader,
  loadMoreProducts,
}: ListProductsProps) => {
  const navigation = useNavigation();

  const [scrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    console.log("teste", scrollEnd);
  }, [scrollEnd]);

  return products?.length > 0 ? (
    <FlatList
      data={products}
      //keyExtractor={(item) => item.id}
      numColumns={2}
      onMomentumScrollEnd={() => setScrollEnd(true)}
      onEndReached={() => {
        loadMoreProducts(products.length);
      }}
      onEndReachedThreshold={0.0}
      ListHeaderComponent={listHeader}
      renderItem={({ index, item }) => (
        <Box flex={1} alignItems="center" justifyContent="center" height={320}>
          <ProductVerticalListCard
            colors={item.colorsHex}
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
