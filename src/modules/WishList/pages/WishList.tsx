import { useMutation, useQuery } from '@apollo/client'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import {
  Box,
  Button, Icon, Picker, ProductHorizontalListCard,
  Typography
} from 'reserva-ui'
import { useAuth } from '../../../context/AuthContext'
import wishListQueries from '../../../graphql/wishlist/wishList'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { Skeleton } from '../../Checkout/components/Skeleton'
import { TopBarDefault } from '../../Menu/components/TopBarDefault'


type Props = StackScreenProps<RootStackParamList, 'WishList'>

export const WishList: React.FC<Props> = ({ navigation }) => {
  const [showWishListCategory, setShowWishListCategory] = useState(true)
  const [sorterVisible, setSorterVisible] = useState(false)

  const [wishIds, setWishIds] = useState<any[]>([])
  const [wishProducts, setWishProducts] = useState<any[]>([])



  const { email, cookie } = useAuth()

  const [removeFromWishList, { loading: loadingIds }] = useMutation(wishListQueries.REMOVE_WISH_LIST)

  const { data: productIds, loading, error, refetch } = useQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email
    }
  })

  const [addWish, { data }] = useMutation(wishListQueries.ADD_WISH_LIST)
  const { data: products, refetch: refetchProducts, loading: loadingProducts } = useQuery(wishListQueries.GET_PRODUCT_BY_IDENTIFIER, {
    variables: {
      idArray: []
    }
  })

  useEffect(() => {
    console.log('products', products)
  }, [products])

  useEffect(() => {
    console.log('email', email)
    console.log('cookie', cookie)
  }, [email, cookie])

  useEffect(() => {
    console.log('wishIds', wishIds)
  }, [wishIds])

  const handleFavorite = async (wishId: any) => {
    if (!!email) {
      console.log(wishId)
      if (!!wishId) {
        await removeFromWishList({
          variables: {
            id: wishId,
            shopperId: email
          }
        })
        await refetch({
          shopperId: email
        })
      }
    }
  }

  useEffect(() => {
    console.log('wishIds', wishIds)
    if (!!wishIds) {
      const idArray = wishIds.map(x => x.productId.split('-')[0]) || []
      refetchProducts(
        { idArray }
      )
    }
  }, [wishIds])

  useEffect(() => {
    if (!!products?.productsByIdentifier && !!wishIds && !!wishIds.length)
      setWishProducts(products.productsByIdentifier)
  }, [products])

  useEffect(() => {
    console.log(email)
    setWishIds(productIds?.viewList.data)
    const idArray = productIds?.viewList.data.map(x => x.productId.split('-')[0]) || []
    console.log(idArray)
    if (!!idArray.length) {
      refetch()

      // refetchProducts(
      //   { idArray }
      // )
    }
  }, [productIds])

  useEffect(() => {
    // addWish({
    //   variables: {
    //     shopperId: 'erick.fraga@globalsys.com.br',
    //     productId: '2213'
    //   }
    // })

    // if (!!email) {


    const idArray = productIds?.viewList.data.map(x => x.productId) || []
    refetch()
    refetchProducts(
      { idArray }
    )
    // } else {
    //   navigation.navigate('Login', { comeFrom: 'Profile' })
    // }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (cookie === null) {
        navigation.navigate("Login", { comeFrom: "Profile" });
      }

      // const idArray = productIds?.viewList.data.map(x => x.productId) || []
      refetch()
      // refetchProducts(
      //   { idArray }
      // )


    }, []));

  return (
    <Box style={{ backgroundColor: 'white' }} flex={1}>
      <TopBarDefault loading={false} showShadow />
      {/* <Box> */}
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

      {/* <Box marginTop='md' paddingBottom='xxxs'> */}
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
      {/* <Box paddingX='xxxs'> */}

      {
        (loading || loadingProducts || loadingIds) ?//|| wishProducts.length <= 0 ?
          <Box>
            <Box paddingX='xxxs' paddingTop='md' mb={37}>
              <Typography variant='tituloSessoes'>Favoritos</Typography>
            </Box>
            <Skeleton>
              <Box flexDirection='row' ml={20} mb={26}>
                <Box width={96} height={146} bg='neutroFrio2' />
                <Box marginLeft='xxxs'>
                  <Box width={180} height={25} bg='neutroFrio2' />
                  <Box width={127} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={102} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={180} height={32} bg='neutroFrio2' mt={17} />
                </Box>
              </Box>
              <Box flexDirection='row' ml={20} mb={26}>
                <Box width={96} height={146} bg='neutroFrio2' />
                <Box marginLeft='xxxs'>
                  <Box width={180} height={25} bg='neutroFrio2' />
                  <Box width={127} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={102} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={180} height={32} bg='neutroFrio2' mt={17} />
                </Box>
              </Box>
              <Box flexDirection='row' ml={20} mb={26}>
                <Box width={96} height={146} bg='neutroFrio2' />
                <Box marginLeft='xxxs'>
                  <Box width={180} height={25} bg='neutroFrio2' />
                  <Box width={127} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={102} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={180} height={32} bg='neutroFrio2' mt={17} />
                </Box>
              </Box>
              <Box flexDirection='row' ml={20} mb={26}>
                <Box width={96} height={146} bg='neutroFrio2' />
                <Box marginLeft='xxxs'>
                  <Box width={180} height={25} bg='neutroFrio2' />
                  <Box width={127} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={102} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={180} height={32} bg='neutroFrio2' mt={17} />
                </Box>
              </Box>
              <Box flexDirection='row' ml={20} mb={26}>
                <Box width={96} height={146} bg='neutroFrio2' />
                <Box marginLeft='xxxs'>
                  <Box width={180} height={25} bg='neutroFrio2' />
                  <Box width={127} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={102} height={25} bg='neutroFrio2' mt={11} />
                  <Box width={180} height={32} bg='neutroFrio2' mt={17} />
                </Box>
              </Box>
            </Skeleton>
          </Box>
          :
          <>
            {
              (wishProducts.length <= 0 && !!wishIds && wishIds.length <= 0) ?
                <EmptyWishList />
                :
                <Box flex={1} >
                  <FlatList
                    data={wishIds}
                    keyExtractor={(item, index) => index.toString()}
                    style={{
                      paddingHorizontal: 16
                    }}
                    ListHeaderComponent={
                      <Box paddingX='xxxs' paddingTop='md' pb={36}>
                        <Typography variant='tituloSessoes'>Favoritos</Typography>
                      </Box>
                    }
                    renderItem={({ item }) => {
                      const product = wishProducts.find(prod => prod.productId == item.productId.split("-")[0])
                      const productSku = product?.items.find(i => i.itemId == item.sku)

                      const installments = productSku?.sellers[0].commertialOffer.Installments;

                      const installmentsNumber = installments?.length > 0 ? installments[0].NumberOfInstallments : 1;

                      const installmentPrice =
                        !!installments && installments.length > 0
                          ? installments[0].Value
                          : product?.priceRange?.listPrice?.lowPrice;

                      // const wishId = wishIds?.find(x => x.productId == product?.productId)

                      return !product ? <></> : <Box marginBottom='xxxs' height={150}>
                        <ProductHorizontalListCard
                          isFavorited
                          itemColor={''}
                          ItemSize={''}
                          productTitle={`${product?.productName.slice(0, 30)}${product?.productName.length > 30 ? '...' : ''
                            }`}
                          installmentsNumber={installmentsNumber}
                          installmentsPrice={installmentPrice}
                          price={productSku?.sellers[0].commertialOffer.Price}
                          onClickFavorite={() => handleFavorite(item.id)}
                          onClickBagButton={() => {
                            // navigation.navigate(')
                            // console.log('item', productSku?.variations[2].values[0])
                            navigation.navigate('ProductDetail', {
                              productId: product?.productId,
                              colorSelected: productSku?.variations[2].values[0]
                            })
                          }}
                          imageSource={productSku?.images[0].imageUrl
                            // .replace("http", "https")
                            // .split("-55-55")
                            // .join("")
                          }
                        />
                      </Box>
                    }}
                  />
                </Box>
            }
          </>
      }
      {/* </Box> */}
      {/* ) : (
        <WishListCategory />
      )} */}
      {/* </Box> */}
      {/* </Box> */}
    </Box >
  )
}


const EmptyWishList = () => {
  const navigation = useNavigation()
  return <Box flex={1} alignItems='center' paddingTop={124}>
    <Icon name='Heartbroken' color='preto' size={86} />
    <Box mx={37} mt={47}>
      <Typography
        fontFamily='reservaSerifRegular'
        fontSize={24} >
        Você ainda não tem favoritos :(
      </Typography>
    </Box>
    <Box mx={58} my={28}>
      <Typography
        fontFamily='nunitoRegular'
        fontSize={14}
        textAlign='center'>
        Navegue pelo nosso app e favorite produtos que são a sua cara!
      </Typography>
    </Box>
    <Button title='NAVEGAR' variant='primarioEstreito' width={258} onPress={() => navigation.navigate('Home')} />
  </Box>
}