import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';

import { Box } from '../../../components/Box/Box';
import { Picker } from '../../../components/Picker/Picker';
import { Typography } from '../../../components/Typography/Typography';
import { useCart } from '../../../context/CartContext';
import wishListQueries from '../../../graphql/wishlist/wishList';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { Skeleton } from '../../Checkout/components/Skeleton';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { EmptyWishList } from '../components/EmptyWishList';
import { slugify } from '../../../utils/slugify';
import EventProvider from '../../../utils/EventProvider';
import { getBrandByUrl } from '../../../utils/getBrandByURL';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { createNavigateToProductParams } from '../../../utils/createNavigateToProductParams';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { ProductHorizontalListCard } from '../../../components/ProductHorizontalListCard/ProductHorizontalListCard';
import { ModalBag } from '../../../components/ModalBag/ModalBag';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';

interface IData {
  loading: boolean;
  error: ApolloError | null;
  productIds: string[] | null
}

type Props = StackScreenProps<RootStackParamList, 'WishList'>;

export const WishList = ({ navigation }: Props) => {
  const [sorterVisible, setSorterVisible] = useState(false);

  const [wishIds, setWishIds] = useState<any[]>([]);
  const [wishProducts, setWishProducts] = useState<any[]>([]);
  const [loadingWishProducts, setLoadingWishProducts] = useState(false);
  const { addItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const { profile } = useAuthStore(['profile']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const [removeFromWishList] = useMutation(wishListQueries.REMOVE_WISH_LIST);

  const [getWishList] = useLazyQuery(wishListQueries.GET_WISH_LIST, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [{ loading, productIds }, setWishList] = useState<IData>({
    loading: true,
    error: null,
    productIds: null,
  });

  const refetch = async () => {
    setWishList({ productIds: null, loading: true, error: null });

    await getWishList({
      variables: { shopperId: profile?.email || '' },
    }).then((response) => {
      setWishList({
        productIds: response.data,
        loading: false,
        error: response.error || null,
      });
    });
  };

  const [getWishListProducts] = useLazyQuery(
    wishListQueries.GET_PRODUCT_BY_IDENTIFIER,
    {
      variables: {
        idArray: [] as any[],
      },
    },
  );

  const [{ products }, setWishListProducts] = useState<{
    products: any | null;
  }>({
    products: null,
  });

  const refetchProducts = async (props?: { idArray: any[] }) => {
    await getWishListProducts({
      variables: {
        idArray: props ? props.idArray : [],
      },
    }).then((response) => {
      setWishListProducts({
        products: response.data,
      });
    });
  };

  const handleFavorite = async (wishId: any) => {
    if (profile?.email) {
      setLoadingWishProducts(true);
      if (wishId) {
        const { data } = await removeFromWishList({
          variables: {
            shopperId: profile.email,
            id: wishId,
          },
        });
        if (data) await refetch();
      }

      setLoadingWishProducts(false);
    }
  };

  const onProductAdd = async (itemId: any, sellers: any) => {
    const addItemResponse = await addItem({
      quantity: 1,
      itemId,
      seller: sellers,
    });
    setIsVisible(true);

    if (!addItemResponse?.ok) {
      Alert.alert('Produto sem estoque', addItemResponse?.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (wishIds) {
        const idArray = wishIds.map((x) => x?.productId?.split('-')[0]) || [];
        await refetchProducts({ idArray });
      }
    })();
  }, [wishIds]);

  useEffect(() => {
    if (!!products?.productsByIdentifier && !!wishIds && !!wishIds.length) {
      setLoadingWishProducts(true);
      const newWishList: any[] = [];

      wishIds.forEach((item) => {
        const product = products.productsByIdentifier.find(
          (prod: any) => prod?.productId === item?.productId?.split('-')[0],
        );

        if (product) {
          const productSku = product?.items.find(
            (i: any) => i.itemId === item.sku,
          );
          const installments = productSku?.sellers[0].commertialOffer.Installments;

          const availableProduct = productSku?.sellers[0].commertialOffer.AvailableQuantity
            > 0;

          const installmentsNumber = installments?.reduce(
            (prev:any, next: any) => (
              prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next),
            { NumberOfInstallments: 0, Value: 0 },
          );

          const installmentPrice = installments?.reduce(
            (prev:any, next: any) => (
              prev.NumberOfInstallments > next.NumberOfInstallments ? prev : next),
            { NumberOfInstallments: 0, Value: 0 },
          );

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

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await refetch();
      })();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (profile?.authCookie === null) {
        navigation.navigate('Login', { comeFrom: 'Profile' });
      }
    }, [profile?.authCookie]),
  );

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loading, startLoadingTime, onFinishLoad]);

  return (
    <Box style={{ backgroundColor: 'white' }} flex={1}>
      <ModalBag
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      />

      <TopBarDefault loading={false} showShadow />

      <Picker
        onSelect={() => {
          setSorterVisible(false);
        }}
        onAndroidBackButtonPress={() => false}
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
        onClose={() => {
          setSorterVisible(false);
        }}
        title="Tamanho"
      />

      {loadingWishProducts || loading ? (
        <Box flex={1}>
          <Box paddingX="xxxs" paddingTop="md" mb="xs">
            <Typography variant="tituloSessoes">Favoritos</Typography>
          </Box>
          <Skeleton>
            {[0, 1, 2, 3, 4].map((key: number) => (
              <Box key={key} flexDirection="row" ml="xxs" mb="xxs">
                <Box width={96} height={146} bg="neutroFrio2" />
                <Box marginLeft="xxxs">
                  <Box width={180} height={25} bg="neutroFrio2" />
                  <Box width={127} height={25} bg="neutroFrio2" mt="nano" />
                  <Box width={102} height={25} bg="neutroFrio2" mt="nano" />
                  <Box width={180} height={32} bg="neutroFrio2" mt="xxs" />
                </Box>
              </Box>
            ))}
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
                keyExtractor={(_, index) => index.toString()}
                style={{
                  paddingHorizontal: 16,
                }}
                ListHeaderComponent={(
                  <Box paddingTop="md" pb="xs">
                    <Typography variant="tituloSessoes">Favoritos</Typography>
                  </Box>
                )}
                renderItem={({ item }) => (
                  <Box marginBottom="xxxs" height={150}>
                    <ProductHorizontalListCard
                      testID={`producthorizontal_card_${slugify(item.productSku?.name)}`}
                      onClickAddCount={() => { }}
                      isFavorited
                      itemColor={item?.productSku?.name?.split('-')[0] || ''}
                      ItemSize={item?.productSku?.name?.split('-')[1] || ''}
                      productTitle={`${item.product?.productName.slice(0, 30)}${item.product?.productName.length > 30 ? '...' : ''
                      }`}
                      price={item.productSku?.sellers[0].commertialOffer.Price}
                      onClickFavorite={() => handleFavorite(item.id)}
                      onClickBagButton={async () => {
                        if (item.availableProduct) {
                          const sellers = item.productSku?.sellers[0].sellerId;

                          if (
                            item.product.description.includes(
                              'A Camiseta Simples® é 100% algodão e tem certificação BCI (Better Cotton Iniciative)',
                            )
                          ) {
                            const { productId, productSku } = item;
                            if (productSku?.name) {
                              EventProvider.logEvent('page_view', {
                                wbrand: 'PicaPau',
                              });
                              EventProvider.logEvent('select_item', {
                                item_list_id: productId || '',
                                item_list_name: productSku?.name?.split('-')[0] ?? '',
                                wbrand: getBrandByUrl(wishProducts),
                              });
                            }

                            navigation.navigate('ProductDetail', createNavigateToProductParams({
                              productId: item?.product?.productId,
                              colorSelected: item?.productSku?.variations[2]?.values[0],
                            }));
                          } else {
                            await onProductAdd(item.productSku?.itemId, sellers);
                          }
                        } else {
                          Alert.alert('Produto sem estoque :(');
                        }
                      }}
                      imageSource={
                        item.productSku?.images[0]?.imageUrl
                      }
                      handleNavigateToProductDetail={() => {
                        const { productId, productSku } = item;
                        if (productSku?.name) {
                          EventProvider.logEvent('page_view', {
                            wbrand: defaultBrand.picapau,
                          });
                          EventProvider.logEvent('select_item', {
                            item_list_id: productId || '',
                            item_list_name: productSku?.name?.split('-')[0] || '',
                            wbrand: getBrandByUrl(wishProducts),
                          });
                        }

                        navigation.navigate('ProductDetail', createNavigateToProductParams({
                          productId: item?.product?.productId,
                          skuId: item?.productSku?.itemId,
                        }));
                      }}
                    />
                  </Box>
                )}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
