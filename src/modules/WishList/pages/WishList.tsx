import React, { useEffect, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, ScrollView, Alert } from 'react-native';
import {
  Box,
  Button,
  Icon,
  Picker,
  ProductHorizontalListCard,
  Typography,
  Image,
} from 'reserva-ui';

import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import wishListQueries from '../../../graphql/wishlist/wishList';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { Skeleton } from '../../Checkout/components/Skeleton';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { ModalBag } from '../../ProductDetail/components/ModalBag';

type Props = StackScreenProps<RootStackParamList, 'WishList'>;

export const WishList: React.FC<Props> = ({ navigation }) => {
  const [showWishListCategory, setShowWishListCategory] = useState(true);
  const [sorterVisible, setSorterVisible] = useState(false);

  const [wishIds, setWishIds] = useState<any[]>([]);
  const [wishProducts, setWishProducts] = useState<any[]>([]);
  const { addItem, sendUserEmail, orderForm, removeItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const { email, cookie } = useAuth();

  const [skip, setSkip] = useState(false);

  const [removeFromWishList, { loading: loadingIds }] = useMutation(
    wishListQueries.REMOVE_WISH_LIST
  );

  const {
    data: productIds,
    loading,
    error,
    refetch,
  } = useQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email,
    },
    skip,
  });

  const [addWish, { data }] = useMutation(wishListQueries.ADD_WISH_LIST);
  const {
    data: products,
    refetch: refetchProducts,
    loading: loadingProducts,
  } = useQuery(wishListQueries.GET_PRODUCT_BY_IDENTIFIER, {
    variables: {
      idArray: [],
    },
  });

  useEffect(() => {
    console.log('products', products);
  }, [products]);

  useEffect(() => {
    console.log('email', email);
    console.log('cookie', cookie);
  }, [email, cookie]);

  useEffect(() => {
    console.log('wishIds', wishIds);
  }, [wishIds]);

  const getStorage = async () => {
    const wishListData = await AsyncStorage.getItem('@WishData');
    if (wishListData) {
      setWishIds(JSON.parse(wishListData));
    }
  };

  const handleFavorite = async (wishId: any) => {
    if (email) {
      if (wishId) {
        // remove wishlist
        const newWishIds = wishIds.filter((x) => x.sku !== wishId);
        AsyncStorage.setItem('@WishData', JSON.stringify(newWishIds));
        getStorage();

        /*  await removeFromWishList({
          variables: {
            id: wishId,
            shopperId: email,
          },
        }); */
        /*  await refetch({
          shopperId: email,
        }); */
      }
    }
  };

  const onProductAdd = async (itemId: any, sellers: any) => {
    const selectedVariantId = itemId;
    const selectedSellerId = sellers;

    const { message, ok } = await addItem(
      1,
      selectedVariantId,
      selectedSellerId
    );
    setIsVisible(true);

    if (!ok) {
      Alert.alert('Produto sem estoque', message);
    }
  };

  useEffect(() => {
    if (wishIds) {
      const idArray = wishIds.map((x) => x.productId.split('-')[0]) || [];
      refetchProducts({ idArray });
    }
  }, [wishIds]);

  useFocusEffect(
    React.useCallback(() => {
      if (productIds?.viewList.data.length <= 0) {
        getStorage();
      }
    }, [productIds])
  );

  useEffect(() => {
    if (!!products?.productsByIdentifier && !!wishIds && !!wishIds.length)
      setWishProducts(products.productsByIdentifier);
  }, [products]);

  useEffect(() => {
    // setWishIds(productIds?.viewList.data);
    // if (productIds?.viewList.data.length > 0) {
    //   AsyncStorage.setItem(
    //     '@WishData',
    //     JSON.stringify(productIds?.viewList.data)
    //   );
    // }
    const idArray =
      productIds?.viewList.data.map((x) => x.productId.split('-')[0]) || [];
    if (idArray.length) {
      refetch();

      // refetchProducts(
      //   { idArray }
      // )
    }
  }, [productIds]);

  useEffect(() => {
    // addWish({
    //   variables: {
    //     shopperId: 'erick.fraga@globalsys.com.br',
    //     productId: '2213'
    //   }
    // })

    // if (!!email) {

    // const idArray = productIds?.viewList.data.map((x) => x.productId) || [];

    refetch();
    // refetchProducts({ idArray });
    // } else {
    //   navigation.navigate('Login', { comeFrom: 'Profile' })
    // }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      /* const idArray = wishIds.map((x) => x.productId) || [];
      refetchProducts({ idArray }); */
      refetch();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (cookie === null) {
        navigation.navigate('Login', { comeFrom: 'Profile' });
      }

      // const idArray = productIds?.viewList.data.map(x => x.productId) || []
      refetch();
      // refetchProducts(
      //   { idArray }
      // )
    }, [cookie])
  );
  useEffect(() => {
    console.log('wishProducts', wishProducts);
  }, [wishProducts]);

  return (
    <Box style={{ backgroundColor: 'white' }} flex={1}>
      <ModalBag
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}
      />

      <TopBarDefault loading={false} showShadow />
      {/* <Box> */}
      <Picker
        onSelect={() => {
          setSorterVisible(false);
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
          setSorterVisible(false);
        }}
        onClose={() => {
          setSorterVisible(false);
        }}
        title="Tamanho"
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

      {loading || loadingProducts || loadingIds ? ( // || wishProducts.length <= 0 ?
        <Box>
          <Box paddingX="xxxs" paddingTop="md" mb={37}>
            <Typography variant="tituloSessoes">Favoritos</Typography>
          </Box>
          <Skeleton>
            <Box flexDirection="row" ml={20} mb={26}>
              <Box width={96} height={146} bg="neutroFrio2" />
              <Box marginLeft="xxxs">
                <Box width={180} height={25} bg="neutroFrio2" />
                <Box width={127} height={25} bg="neutroFrio2" mt={11} />
                <Box width={102} height={25} bg="neutroFrio2" mt={11} />
                <Box width={180} height={32} bg="neutroFrio2" mt={17} />
              </Box>
            </Box>
            <Box flexDirection="row" ml={20} mb={26}>
              <Box width={96} height={146} bg="neutroFrio2" />
              <Box marginLeft="xxxs">
                <Box width={180} height={25} bg="neutroFrio2" />
                <Box width={127} height={25} bg="neutroFrio2" mt={11} />
                <Box width={102} height={25} bg="neutroFrio2" mt={11} />
                <Box width={180} height={32} bg="neutroFrio2" mt={17} />
              </Box>
            </Box>
            <Box flexDirection="row" ml={20} mb={26}>
              <Box width={96} height={146} bg="neutroFrio2" />
              <Box marginLeft="xxxs">
                <Box width={180} height={25} bg="neutroFrio2" />
                <Box width={127} height={25} bg="neutroFrio2" mt={11} />
                <Box width={102} height={25} bg="neutroFrio2" mt={11} />
                <Box width={180} height={32} bg="neutroFrio2" mt={17} />
              </Box>
            </Box>
            <Box flexDirection="row" ml={20} mb={26}>
              <Box width={96} height={146} bg="neutroFrio2" />
              <Box marginLeft="xxxs">
                <Box width={180} height={25} bg="neutroFrio2" />
                <Box width={127} height={25} bg="neutroFrio2" mt={11} />
                <Box width={102} height={25} bg="neutroFrio2" mt={11} />
                <Box width={180} height={32} bg="neutroFrio2" mt={17} />
              </Box>
            </Box>
            <Box flexDirection="row" ml={20} mb={26}>
              <Box width={96} height={146} bg="neutroFrio2" />
              <Box marginLeft="xxxs">
                <Box width={180} height={25} bg="neutroFrio2" />
                <Box width={127} height={25} bg="neutroFrio2" mt={11} />
                <Box width={102} height={25} bg="neutroFrio2" mt={11} />
                <Box width={180} height={32} bg="neutroFrio2" mt={17} />
              </Box>
            </Box>
          </Skeleton>
        </Box>
      ) : (
        <>
          {!!wishIds && wishIds.length <= 0 ? (
            <EmptyWishList />
          ) : (
            <Box flex={1}>
              <FlatList
                data={wishIds}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  paddingHorizontal: 16,
                }}
                ListHeaderComponent={
                  <Box paddingX="xxxs" paddingTop="md" pb={36}>
                    <Typography variant="tituloSessoes">Favoritos</Typography>
                  </Box>
                }
                renderItem={({ item }) => {
                  const product = wishProducts.find(
                    (prod) => prod.productId == item.productId.split('-')[0]
                  );
                  const productSku = product?.items.find(
                    (i) => i.itemId == item.sku
                  );

                  const installments =
                    productSku?.sellers[0].commertialOffer.Installments;

                  const availableProduct =
                    productSku?.sellers[0].commertialOffer.AvailableQuantity >
                    0;

                  const installmentsNumber =
                    installments?.length > 0
                      ? installments[0].NumberOfInstallments
                      : 1;

                  const installmentPrice =
                    !!installments && installments.length > 0
                      ? installments[0].Value
                      : product?.priceRange?.listPrice?.lowPrice;

                  // const wishId = wishIds?.find(x => x.productId == product?.productId)
                  return !product ? (
                    <></>
                  ) : (
                    <Box marginBottom="xxxs" height={150}>
                      <ProductHorizontalListCard
                        onClickAddCount={() => {}}
                        isFavorited
                        itemColor={productSku?.name.split('-')[0] || ''}
                        ItemSize={productSku?.name.split('-')[1] || ''}
                        productTitle={`${product?.productName.slice(0, 30)}${
                          product?.productName.length > 30 ? '...' : ''
                        }`}
                        installmentsNumber={installmentsNumber}
                        installmentsPrice={installmentPrice}
                        price={productSku?.sellers[0].commertialOffer.Price}
                        onClickFavorite={() => handleFavorite(item.sku)}
                        onClickBagButton={() => {
                          // setSelectedVariantItemId(productSku?.itemId);

                          if (availableProduct) {
                            const sellers = productSku?.sellers[0].sellerId;

                            if (
                              product.description.includes(
                                'A Camiseta Simples® é 100% algodão e tem certificação BCI (Better Cotton Iniciative)'
                              )
                            ) {
                              navigation.navigate('ProductDetail', {
                                productId: product?.productId,
                                colorSelected:
                                  productSku?.variations[2].values[0],
                                sizeSelected: productSku?.name.split('-')[1],
                              });
                            } else {
                              onProductAdd(productSku?.itemId, sellers);
                            }
                          } else {
                            Alert.alert('Produto sem estoque :(');
                          }

                          // navigation.navigate(')
                          // console.log('item', productSku?.variations[2].values[0])
                        }}
                        imageSource={
                          productSku?.images[0].imageUrl
                          // .replace("http", "https")
                          // .split("-55-55")
                          // .join("")
                        }
                      />
                    </Box>
                  );
                }}
              />
            </Box>
          )}
        </>
      )}
      {/* </Box> */}
      {/* ) : (
        <WishListCategory />
      )} */}
      {/* </Box> */}
      {/* </Box> */}
    </Box>
  );
};

const EmptyWishList = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Box flex={1} alignItems="center" paddingTop={110}>
        <Image source={images.noWishList} />
        <Box mx={37} mt="md">
          <Typography fontFamily="reservaSerifRegular" fontSize={24}>
            Você ainda não tem favoritos :(
          </Typography>
        </Box>
        <Box mx={58} my={28}>
          <Typography
            fontFamily="nunitoRegular"
            fontSize={14}
            textAlign="center"
          >
            Navegue pelo nosso app e favorite produtos que são a sua cara!
          </Typography>
        </Box>
        <Button
          title="NAVEGAR"
          variant="primarioEstreito"
          width={258}
          onPress={() => navigation.navigate('Home')}
        />
      </Box>
    </ScrollView>
  );
};
