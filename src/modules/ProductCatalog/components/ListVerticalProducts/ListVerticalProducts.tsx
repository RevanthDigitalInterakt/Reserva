import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Image, ProductVerticalListCard } from 'reserva-ui'
import { RootStackParamList } from '../../../../routes/StackNavigator'
import { ApplicationState } from '../../../../store'
import { Product } from '../../../../store/ducks/product/types'
import {
  appendWishlist,
  removeWishlist,
} from '../../../../store/ducks/wishlist/actions'

interface ListProductsProps {
  //listHeader: any;
  products: Product[]
  loadMoreProducts: (offSet: number) => void
  listHeader?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export const ListVerticalProducts = ({
  products,
  listHeader,
  loadMoreProducts,
}: ListProductsProps) => {
  const navigation = useNavigation()

  useEffect(() => {
    console.log(products)
  }, [])

  let dispatch = useDispatch()

  let wishlist = useSelector((state: ApplicationState) => state.wishlist.data)

  return products?.length > 0 ? (
    <FlatList
      data={products}
      //keyExtractor={(item) => item.id}
      numColumns={2}
      onEndReached={() => loadMoreProducts(products.length)}
      onEndReachedThreshold={0}
      ListHeaderComponent={listHeader}
      renderItem={({ index, item }) => (
        <Box flex={1} alignItems='center' justifyContent='center' height={320}>
          <ProductVerticalListCard
            colors={item.colorsHex}
            imageSource={item.imageUrl}
            installmentsNumber={item.installmentNumber}
            isFavorited={wishlist.find((x) => x.id == item.id) != undefined}
            discountTag={item.discountTag > 0 ? item.discountTag : undefined}
            installmentsPrice={item.installmentPrice || 0}
            currency={item.currency}
            price={item.fullPrice || 0}
            productTitle={item.title}
            onClickFavorite={() => {
              wishlist.find((x) => x.id == item.id) != undefined
                ? dispatch(removeWishlist(item))
                : dispatch(appendWishlist(item))
            }}
            onClickImage={() => {
              navigation.navigate('ProductDetail', {
                productId: item.id,
              })
            }}
          />
        </Box>
      )}
    />
  ) : null
}
