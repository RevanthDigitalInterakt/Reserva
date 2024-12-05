import { useLazyQuery } from '@apollo/client';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { ModalBag } from '../../components/ModalBag/ModalBag';
import { WishListProductCard } from '../../components/WishListProductCard/WishListProductCard';
import wishListQueries from '../../graphql/wishlist/wishList';
import { useWishlistActions } from '../../hooks/useWishlistActions';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import EventProvider from '../../utils/EventProvider';
import { createNavigateToProductParams } from '../../utils/createNavigateToProductParams';
import { defaultBrand } from '../../utils/defaultWBrand';
import { getBrandByUrl } from '../../utils/getBrandByURL';
import { slugify } from '../../utils/slugify';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { usePageLoadingStore } from '../../zustand/usePageLoadingStore/usePageLoadingStore';
import useWishlistStore from '../../zustand/useWishlistStore';
import { EmptyWishList } from './EmptyWishList';
import SkeletonWishList from './SkeletonWishList';
import { mapProductToFavoriteItem } from './adaptWishList';
import { Box } from '../../components/Box/Box';
import { Typography } from '../../components/Typography/Typography';
import { mergeItemsPackage } from '../../utils/mergeItemsPackage';
import UxCam from '../../utils/UxCam';

function WishList() {
  const navigation = useNavigation();
  const [wishProducts, setWishProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAddToBag, setLoadingAddToBag] = useState(false);
  const [loadingSkuId, setLoadingSkuId] = useState<string | null>(null);
  const [showAnimationBag, setShowAnimationBag] = useState(false);

  const { profile, initialized: initializedAuth } = useAuthStore(['profile', 'initialized']);

  const {
    onToggleFavorite,
  } = useWishlistActions();

  const {
    refreshFavorites,
    favorites: favoritesIds,
    initialized,
    loading: loadingWishList,
  } = useWishlistStore([
    'refreshFavorites',
    'favorites',
    'loading',
    'initialized',
  ]);

  const { actions, packageItems, orderFormId } = useBagStore(['actions', 'orderFormId', 'packageItems']);

  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  // TODO move request to BFF
  const [getWishListProducts] = useLazyQuery(
    wishListQueries.GET_PRODUCT_BY_IDENTIFIER,
    {
      variables: {
        idArray: [] as string[],
      },
    },
  );

  const doInitialRequest = React.useCallback(async () => {
    if (!favoritesIds?.length) {
      setWishProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data: listProduct } = await getWishListProducts({
        variables: {
          idArray: favoritesIds,
        },
      });

      const favorites = listProduct.productsByIdentifier.flatMap(
        (product) => mapProductToFavoriteItem(product, favoritesIds),
      );

      setWishProducts(favorites);
    } catch (e) {
      ExceptionProvider.captureException(e);
    } finally {
      setLoading(false);
    }
  }, [favoritesIds, getWishListProducts]);

  const doRefresh = React.useCallback(async (newFavoritesIds: string[]) => {
    if (!newFavoritesIds?.length) {
      setWishProducts([]);
      return;
    }

    try {
      const { data: listProduct } = await getWishListProducts({
        variables: {
          idArray: newFavoritesIds,
        },
      });

      const favorites = listProduct.productsByIdentifier.flatMap(
        (product) => mapProductToFavoriteItem(product, newFavoritesIds),
      );

      setWishProducts(favorites);
    } catch (e) {
      ExceptionProvider.captureException(e);
    } finally {
      setLoadingSkuId(null);
    }
  }, [getWishListProducts]);

  const handleFavorite = useCallback(async (data) => {
    const {
      product, installmentPrice, skuName, skuId, colorName, size, ean,
    } = data;

    setLoadingSkuId(skuId);

    await onToggleFavorite({
      ean,
      skuId,
      skuName,
      productId: skuId,
      colorName,
      size,
      productName: product?.productName,
      lowPrice: installmentPrice,
      brand: '',
      category: '',
    });

    const values = await refreshFavorites();
    await doRefresh(values);
  }, [doRefresh, onToggleFavorite, refreshFavorites]);

  const addTagsUponCartUpdate = useCallback((productName, imageUrl) => {
    if (!productName || !imageUrl) return;

    const timestamp = Math.floor(Date.now() / 1000);

    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: timestamp.toString(),
      product_name: productName,
      product_image: imageUrl,
    });
  }, []);

  const onAddProductToCart = useCallback(async (data) => {
    try {
      if (loadingAddToBag) return;

      setLoadingAddToBag(true);

      const {
        skuId, sellerId, product, imageUrl,
      } = data;

      const mergeItens = mergeItemsPackage(packageItems);
      const orderFormItem = mergeItens.find((item) => item.id === skuId);

      await actions.ADD_ITEM(
        sellerId,
        skuId,
        orderFormItem ? orderFormItem.quantity + 1 : 1,
      );

      setShowAnimationBag(true);

      addTagsUponCartUpdate(product.productName, imageUrl);
    } catch (err) {
      ExceptionProvider.captureException(err, { orderFormId });
      Alert.alert('Ocorreu um erro', err.message);

      actions.CREATE_NEW_ORDER_FORM();
    } finally {
      setLoadingAddToBag(false);
    }
  }, [actions, loading, orderFormId]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (initializedAuth) {
        if (!profile?.email) {
          setWishProducts([]);
          navigation.navigate('Login', { comeFrom: 'Profile' });
          return;
        }

        if (initialized) {
          await doInitialRequest();
        }
      }
    });

    return unsubscribe;
  }, [navigation,
    initialized,
    doInitialRequest,
    profile?.email,
    initializedAuth]);

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [startLoadingTime, onFinishLoad, loading]);

  useEffect(() => {
    UxCam.tagScreen('Wish List Screen');
  }, []);

  return (
    <Box style={{ backgroundColor: 'white' }} flex={1}>
      <ModalBag
        isVisible={showAnimationBag}
        onBackdropPress={() => setShowAnimationBag(false)}
      />

      <TopBarDefault loading={loadingWishList || loadingAddToBag} showShadow />

      {loading ? (
        <SkeletonWishList />
      ) : (
        <>
          {!wishProducts.length ? (
            <EmptyWishList />
          ) : (
            <Box flex={1}>
              <FlatList
                data={wishProducts}
                keyExtractor={(item) => item.skuId}
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
                    <WishListProductCard
                      loadingWishList={(loadingSkuId === item.skuId)}
                      testID={`producthorizontal_card_${slugify(item.skuId)}`}
                      color={item.colorName}
                      isAvailable={item.availableProduct}
                      size={item.size}
                      title={item.product?.productName}
                      price={item.product?.priceRange.sellingPrice.lowPrice}
                      imageUrl={item?.imageUrl}
                      onClickFavorite={() => handleFavorite(item)}
                      onClickBagButton={() => onAddProductToCart(item)}
                      loadingBagButton={loadingAddToBag}
                      handleNavigateToProductDetail={() => {
                        const { productId, productSku } = item;
                        if (productSku?.name) {
                          EventProvider.logEvent('page_view', {
                            item_brand: defaultBrand.picapau,
                          });
                          EventProvider.logEvent('select_item', {
                            item_list_id: productId || '',
                            item_list_name: productSku?.name?.split('-')[0] || '',
                            item_brand: getBrandByUrl(wishProducts),
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
}

export default WishList;
