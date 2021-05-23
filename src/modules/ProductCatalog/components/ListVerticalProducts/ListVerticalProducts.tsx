import { useNavigation } from '@react-navigation/core'
import React, { Component } from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { Box, Image, ProductVerticalListCard } from 'reserva-ui'
import { Product } from '../../../../store/ducks/products/types'

interface ListProductsProps {
  //listHeader: any;
  products: Product[]
  listHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export const ListVerticalProducts = ({
  products,
  listHeader,
}: ListProductsProps) => {
  const navigation = useNavigation()

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      ListHeaderComponent={listHeader}
      renderItem={({ index, item }) => (
        <Box flex={1} alignItems='center' justifyContent='center' height={320}>
          <ProductVerticalListCard
            imageSource={item.imageUrl}
            installmentsNumber={item.installmentNumber}
            discountTag={
              item.discountTag != '0%'
                ? parseInt(item.discountTag.replace('%', ''))
                : undefined
            }
            installmentsPrice={item.installmentPrice || 0}
            currency={item.currency}
            price={item.fullPrice || 0}
            productTitle={item.title}
            onClickImage={() => {
              navigation.navigate('ProductDetail', {
                product: item,
              })
            }}
          />
        </Box>
      )}
    />
  )
}
