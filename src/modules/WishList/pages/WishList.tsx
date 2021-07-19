import React, { useDebugValue, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import {
  Box,
  Button,
  ProductHorizontalListCard,
  Typography,
  Picker,
} from 'reserva-ui'
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton'
import { images } from '../../../assets'
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton'
import { WishListCategory } from './WishListCategory'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeWishlist,
  setWishlist,
} from '../../../store/ducks/wishlist/actions'
import { ApplicationState } from '../../../store'
import { FlatList } from 'react-native'
import ItemList from '../../Profile/Components/ItemList'
import { Product } from '../../../store/ducks/product/types'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../routes/StackNavigator'
import wishListQueries from '../../../graphql/wishlist/wishList'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useAuth } from '../../../context/AuthContext'
import { profileQuery } from '../../../store/ducks/profile/types'
import { Alert } from 'react-native'


type Props = StackScreenProps<RootStackParamList, 'WishList'>

export const WishList: React.FC<Props> = ({ navigation }) => {
  const [showWishListCategory, setShowWishListCategory] = useState(true)
  const [sorterVisible, setSorterVisible] = useState(false)

  const [wishIds, setWishIds] = useState<any[]>([])
  const [wishProducts, setWishProducts] = useState<any[]>([])

  const { email } = useAuth()

  const [removeFromWishList] = useMutation(wishListQueries.REMOVE_WISH_LIST)

  const { data: productIds, loading, error, refetch } = useQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email
    }
  })

  const [addWish, { data }] = useMutation(wishListQueries.ADD_WISH_LIST)
  const { data: products, refetch: refetchProducts } = useQuery(wishListQueries.GET_PRODUCT_BY_IDENTIFIER, {
    variables: {
      idArray: []
    }
  })

  const handleFavorite = async (wishId: any) => {
    if (!!email) {

      if (!!wishId) {
        console.log('wishId', wishId)
        await removeFromWishList({
          variables: {
            id: wishId.id,
            shopperId: 'erick.fraga@globalsys.com.br'
          }
        })
        await refetch({
          shopperId: 'erick.fraga@globalsys.com.br'
        })
      }
    } else {
      Alert.alert('Você precisa se identificar para favoritar um produto!')
    }
  }

  useEffect(() => {
    if (!!products?.productsByIdentifier)
      setWishProducts(products.productsByIdentifier)
  }, [products])

  useEffect(() => {
    setWishIds(productIds?.viewList.data)
    const idArray = productIds?.viewList.data.map(x => x.productId.split('-')[0]) || []
    console.log(idArray)
    refetch()
    refetchProducts(
      { idArray }
    )
  }, [productIds])

  useEffect(() => {
    // addWish({
    //   variables: {
    //     shopperId: 'erick.fraga@globalsys.com.br',
    //     productId: '2213'
    //   }
    // })
    const idArray = productIds?.viewList.data.map(x => x.productId) || []
    console.log(idArray)
    refetch()
    refetchProducts(
      { idArray }
    )
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <TopBarBackButton loading={false} showShadow />
      <Box>
        <Picker
          onSelect={() => {
            setSorterVisible(false)
          }}
          isVisible={sorterVisible}
          items={[
            {
              text: '38',
            },
            {
              text: '40',
            },
            {
              text: '41',
            },
            {
              text: '42',
            },
            {
              text: '43',
            },
          ]}
          onConfirm={() => {
            setSorterVisible(false)
          }}
          onClose={() => {
            setSorterVisible(false)
          }}
          title='Tamanho'
        />

        <Box marginTop='md' paddingBottom='xxxs'>
          <Box paddingX='xxxs'>
            <Typography variant='tituloSessoes'>Favoritos</Typography>
          </Box>
          {/* <Box paddingX='xxxs' marginTop='xxxs' flexDirection='row'>
            <Box width={1 / 2}>
              <Button
                onPress={() => {
                  setShowWishListCategory(false)
                }}
                title='Todos os itens'
                height={32}
                color={showWishListCategory ? 'preto' : 'white'}
                fontFamily='nunitoRegular'
                borderColor={showWishListCategory ? 'preto' : null}
                borderWidth={showWishListCategory ? 1 : null}
                fontSize={12}
                bg={!showWishListCategory ? 'neutroFrio2' : null}
                marginRight='nano'
                inline
              />
            </Box>
            <Box width={1 / 2}>
              <Button
                marginLeft='nano'
                color={showWishListCategory ? 'white' : 'preto'}
                height={32}
                onPress={() => {
                  setShowWishListCategory(true)
                }}
                borderColor={showWishListCategory ? null : 'preto'}
                borderWidth={showWishListCategory ? null : 1}
                fontSize={12}
                bg={showWishListCategory ? 'neutroFrio2' : null}
                fontFamily='nunitoRegular'
                title='Minhas categorias'
                inline
              />
            </Box>
          </Box> */}
          {/* {!showWishListCategory ? ( */}
          <Box paddingX='xxxs'>
            <FlatList
              data={wishProducts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const installments =
                  item.items[0].sellers[0].commertialOffer.Installments;
                const installmentsNumber =
                  installments.length > 0 ? installments[0].NumberOfInstallments : 1;

                const installmentPrice =
                  installments.length > 0
                    ? installments[0].Value
                    : item.priceRange?.listPrice?.lowPrice;

                const wishId = wishIds.find(x => x.productId == item.productId)

                return <Box marginTop='xxxs' height={147}>
                  <ProductHorizontalListCard
                    isFavorited
                    itemColor={''}
                    ItemSize={''}
                    productTitle={`${item.productName.slice(0, 30)}${item.productName.length > 30 ? '...' : ''
                      }`}
                    installmentsNumber={installmentsNumber}
                    installmentsPrice={installmentPrice}
                    price={item.items[0].sellers[0].commertialOffer.Price}
                    onClickFavorite={() => handleFavorite(wishId)}
                    onClickBagButton={() => {

                    }}
                    imageSource={item.items[0].images[0].imageUrl
                      // .replace("http", "https")
                      // .split("-55-55")
                      // .join("")
                    }
                  />
                </Box>
              }
              }
            />
          </Box>
          {/* ) : (
            <WishListCategory />
          )} */}
        </Box>
      </Box>
    </SafeAreaView>
  )
}
