import React, { useEffect, useState } from 'react';

import { useLazyQuery, useMutation } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Alert } from 'react-native';
import {
  Box,
  Picker,
  ProductHorizontalListCard,
  Typography,
} from '@usereservaapp/reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import wishListQueries from '../../../graphql/wishlist/wishList';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { Skeleton } from '../../Checkout/components/Skeleton';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { ModalBag } from '../../ProductDetail/components/ModalBag';
import { EmptyWishList } from '../components/EmptyWishList';
import { slugify } from '../../../utils/slugify';
import EventProvider from '../../../utils/EventProvider';

type Props = StackScreenProps<RootStackParamList, 'WishList'>;

export const WishList: React.FC<Props> = ({ navigation }) => {
  const { navigate } = useNavigation();

  const [showWishListCategory, setShowWishListCategory] = useState(true);
  const [sorterVisible, setSorterVisible] = useState(false);

  const [wishIds, setWishIds] = useState<any[]>([]);
  const [wishProducts, setWishProducts] = useState<any[]>([]);
  const [loadingWishProducts, setLoadingWishProducts] = useState(false);
  const {
    addItem, sendUserEmail, orderForm, removeItem,
  } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const { email, cookie } = useAuth();

  const [skip, setSkip] = useState(false);

  const [removeFromWishList, { loading: loadingIds }] = useMutation(
    wishListQueries.REMOVE_WISH_LIST,
  );

  const [getWishList] = useLazyQuery(wishListQueries.GET_WISH_LIST, {
    variables: {
      shopperId: email,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [{ loading, productIds, error }, setWishList] = useState({
    loading: true,
    error: null,
    productIds: null,
  });

  const refetch = async () => {
    // setWishList({
    //   productIds: null,
    //   loading: false,
    //   error: null,
    // });

    await getWishList().then((response) => {
      setWishList({
        productIds: response.data,
        loading: false,
        error: response.error,
      });
    });
  };

  // useEffect(() => {
  //   refetch();
  // }, []);

  const [addWish, { data }] = useMutation(wishListQueries.ADD_WISH_LIST);

  const [getWishListProducts] = useLazyQuery(
    wishListQueries.GET_PRODUCT_BY_IDENTIFIER,
    {
      variables: {
        idArray: [] as any[],
      },
    },
  );

  const [{ loadingProducts, products }, setWishListProducts] = useState<{
    products: any | null;
    loadingProducts: boolean;
  }>({
    loadingProducts: false,
    products: null,
  });

  const refetchProducts = async (props?: { idArray: any[] }) => {
    // setWishListProducts({
    //   loadingProducts: true,
    //   products: null,
    // });

    await getWishListProducts({
      variables: {
        idArray: props ? props.idArray : [],
      },
    }).then((response) => {
      setWishListProducts({
        products: response.data,
        loadingProducts: false,
      });
    });
  };

  // useEffect(() => {
  //   refetchProducts();
  // }, []);

  const handleFavorite = async (wishId: any) => {
    if (email) {
      setLoadingWishProducts(true);
      if (wishId) {
        // remove wishlist

        const { data } = await removeFromWishList({
          variables: {
            shopperId: email,
            id: wishId,
          },
        });
        if (data) await refetch();
      }
    }
  };

  const onProductAdd = async (itemId: any, sellers: any) => {
    const selectedVariantId = itemId;
    const selectedSellerId = sellers;

    const addItemResponse = await addItem({
      quantity: 1,
      itemId: selectedVariantId,
      seller: selectedSellerId,
    });
    setIsVisible(true);

    if (!addItemResponse?.ok) {
      Alert.alert('Produto sem estoque', addItemResponse?.message);
    }
  };

  useEffect(() => {
    if (wishIds) {
      const idArray = wishIds.map((x) => x.productId.split('-')[0]) || [];
      refetchProducts({ idArray });
    }
  }, [wishIds]);

  useEffect(() => {
    setLoadingWishProducts(true);
    if (!!products?.productsByIdentifier && !!wishIds && !!wishIds.length) {
      const newWishList: any[] = [];

      wishIds.forEach((item) => {
        const product = products.productsByIdentifier.find(
          (prod) => prod.productId == item.productId.split('-')[0],
        );
        if (product) {
          const productSku = product?.items.find(
            (i) => i.itemId == item.sku,
          );
          const installments = productSku?.sellers[0].commertialOffer.Installments;

          const availableProduct = productSku?.sellers[0].commertialOffer.AvailableQuantity
            > 0;

          const installmentsNumber = installments?.reduce((prev, next) => (prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next),
            { NumberOfInstallments: 0, Value: 0 });

          const installmentPrice = installments?.reduce((prev, next) => (prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next),
            { NumberOfInstallments: 0, Value: 0 });

          const wish = {
            id: item.id,
            product,
            productSku,
            availableProduct,
            installmentsNumber,
            installmentPrice,
          };
          newWishList.push(wish);
        }
      });
      setWishProducts(newWishList);
      setLoadingWishProducts(false);
    }
  }, [products]);

  useEffect(() => {
    setWishIds(productIds?.viewList.data);
  }, [productIds]);

  // useEffect(() => {
  //   // addWish({
  //   //   variables: {
  //   //     shopperId: 'erick.fraga@globalsys.com.br',
  //   //     productId: '2213'
  //   //   }
  //   // })

  //   // if (!!email) {

  //   // const idArray = productIds?.viewList.data.map((x) => x.productId) || [];

  //   refetch();
  //   // refetchProducts({ idArray });
  //   // } else {
  //   //   navigation.navigate('Login', { comeFrom: 'Profile' })
  //   // }
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (cookie === null) {
        navigation.navigate('Login', { comeFrom: 'Profile' });
      }

      // const idArray = productIds?.viewList.data.map(x => x.productId) || []
      // refetch();

      // refetchProducts(
      //   { idArray }
      // )
    }, [cookie]),
  );

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

      {loading || loadingProducts || loadingIds || loadingWishProducts ? (
        <Box flex={1}>
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
                data={wishProducts}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  paddingHorizontal: 16,
                }}
                ListHeaderComponent={(
                  <Box paddingTop="md" pb={36}>
                    <Typography variant="tituloSessoes">Favoritos</Typography>
                  </Box>
                )}
                renderItem={({ item }) => (
                  <Box marginBottom="xxxs" height={150}>
                    <ProductHorizontalListCard
                      testID={`producthorizontal_card_${slugify(item.productSku?.name)}`}
                      onClickAddCount={() => { }}
                      isFavorited
                      itemColor={item.productSku?.name.split('-')[0] || ''}
                      ItemSize={item.productSku?.name.split('-')[1] || ''}
                      productTitle={`${item.product?.productName.slice(0, 30)}${item.product?.productName.length > 30 ? '...' : ''
                      }`}
                      installmentsNumber={item.installmentsNumber}
                      installmentsPrice={item.installmentPrice}
                      price={item.productSku?.sellers[0].commertialOffer.Price}
                      onClickFavorite={() => handleFavorite(item.id)}
                      onClickBagButton={() => {
                        // setSelectedVariantItemId(productSku?.itemId);

                        if (item.availableProduct) {
                          const sellers = item.productSku?.sellers[0].sellerId;

                          if (
                            item.product.description.includes(
                              'A Camiseta Simples® é 100% algodão e tem certificação BCI (Better Cotton Iniciative)',
                            )
                          ) {
                            EventProvider.logEvent('select_item', {
                              item_list_id: item.productId ?? '',
                              item_list_name: item.productSku?.name.split('-')[0] ?? '',
                            });

                            navigation.navigate('ProductDetail', {
                              productId: item.product?.productId,
                              colorSelected:
                                  item.productSku?.variations[2].values[0],
                              sizeSelected: item.productSku?.name.split('-')[1],
                            });
                          } else {
                            onProductAdd(item.productSku?.itemId, sellers);
                          }
                        } else {
                          Alert.alert('Produto sem estoque :(');
                        }
                      }}
                      imageSource={
                          item.productSku?.images[0].imageUrl
                          // .replace("http", "https")
                          // .split("-55-55")
                          // .join("")
                        }
                      handleNavigateToProductDetail={() => {
                        EventProvider.logEvent('select_item', {
                          item_list_id: item.productId ?? '',
                          item_list_name: item.productSku?.name.split('-')[0] ?? '',
                        });

                        navigation.navigate('ProductDetail', {
                          productId: item.product?.productId,
                          itemId: item.productSku?.itemId,
                          sizeSelected: item.productSku?.name.split('-')[1],
                        });
                      }}
                    />
                  </Box>
                )}
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
