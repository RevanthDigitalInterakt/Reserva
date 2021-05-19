import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { Box, Image, ProductVerticalListCard } from 'reserva-ui';
import { Product } from '../../../../store/ducks/products/types';

interface ListProductsProps {
  //listHeader: any;
  products: Product[];
  listHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const ListVerticalProducts = ({
  products,
  listHeader,
}: ListProductsProps) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      ListHeaderComponent={listHeader}
      renderItem={({ index, item }) => (
        <Box flex={1} alignItems='center' justifyContent='center' height={320}>
          <ProductVerticalListCard
            imageSource={item.images[0]}
            installmentsNumber={1}
            installmentsPrice={item.price || 0}
            currency='R$'
            price={item.price || 0}
            productTitle={item.title}
            onClickImage={() => {
              navigation.navigate('ProductDetail', {
                product: item,
              });
            }}
          />
        </Box>
      )}
    />
  );
};
