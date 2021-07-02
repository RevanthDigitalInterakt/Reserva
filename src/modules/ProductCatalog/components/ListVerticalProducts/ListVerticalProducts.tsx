import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Image, ProductVerticalListCard } from 'reserva-ui'
import { ProductQL } from '../../../../graphql/products/productSearch'
import { RootStackParamList } from '../../../../routes/StackNavigator'
import { ApplicationState } from '../../../../store'
import { Product } from '../../../../store/ducks/product/types'
import {
  appendWishlist,
  removeWishlist,
  setWishlist,
} from '../../../../store/ducks/wishlist/actions'
import { CreateCategoryModal } from '../CategoryModals/CategoryModals'

interface ListProductsProps {
  products: ProductQL[]
  loadMoreProducts: (offSet: number) => void
  listHeader?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

const getColorsInProductSearch = () => {
  
}

const getPercent = (sellingPrice: number, listPrice: number): number | undefined => {
  if(sellingPrice === listPrice){
    return undefined;
  }
  return Math.round((listPrice - sellingPrice) * 100 / listPrice);
}

export const ListVerticalProducts = ({
  products,
  listHeader,
  loadMoreProducts,
}: ListProductsProps) => {
  const navigation = useNavigation()
  const [favoritedProduct, setFavoritedProduct] = useState<Product>()
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    console.log("products", products)
    //dispatch(setWishlist([]))
  }, [])

  let dispatch = useDispatch()

  let wishlist = useSelector((state: ApplicationState) => state.wishlist.data)

  const handleOnFavorite = (prod: Product) => {
    setFavoritedProduct(prod)
    setIsVisible(true)
  }

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
        renderItem={({ index, item }) => (
          <Box
            flex={1}
            alignItems='center'
            justifyContent='center'
            height={320}>
            <ProductVerticalListCard
              colors={[""]}
              imageSource={item.items[0].images[0].imageUrl}
              installmentsNumber={item.items[0].sellers[0].commertialOffer.Installments[0].NumberOfInstallments}
              installmentsPrice={item.items[0].sellers[0].commertialOffer.Installments[0].Value}
              currency="R$"
              discountTag={
                getPercent(item.priceRange?.sellingPrice.lowPrice, item.priceRange?.listPrice.lowPrice)
              }
              priceWithDiscount={item.priceRange?.sellingPrice.lowPrice}
              price={item.priceRange?.listPrice?.lowPrice}
              productTitle={item.productName}
              onClickImage={() => {
                navigation.navigate('ProductDetail', {
                  productId: item.productId,
                })
              }}
            />
          </Box>
        )}
      />
    </>
  ) : null
}
