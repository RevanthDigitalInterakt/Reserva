import { useCallback } from 'react';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useAuth } from '../context/AuthContext';
import EventProvider from '../utils/EventProvider';
import wishListQueries from '../graphql/wishlist/wishList';

export function useWishlistLegacy() {
  const navigation = useNavigation();
  const { email } = useAuth();

  const [onAddWishlist, { loading: loadingAdd }] = useMutation(
    wishListQueries.ADD_WISH_LIST,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    },
  );

  const [onRemoveWishlist, { loading: loadingRemove }] = useMutation(
    wishListQueries.REMOVE_WISH_LIST,
    {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    },
  );

  const [onCheckProductWishlist] = useLazyQuery(
    wishListQueries.CHECK_LIST,
    {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
  );

  const verifyAuthentication = useCallback(() => {
    if (!email) {
      navigation.navigate('Login', { comeFrom: 'Favorite' });
      return false;
    }

    return true;
  }, [email, navigation]);

  const addToWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!verifyAuthentication()) return false;

      const { data } = await onAddWishlist({
        variables: {
          shopperId: email,
          productId: productId.split('-')[0],
          sku: skuId,
        },
      });

      EventProvider.logEvent('product_wishlist', { product_id: productId, favorite: 1 });

      return !!data?.wishlistAddProduct;
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('productId', productId);
        scope.setExtra('skuId', skuId);
        Sentry.captureException(err);
      });

      return false;
    }
  }, [verifyAuthentication, onAddWishlist, email]);

  const checkIfProductIsInWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!email || !productId || !skuId) return false;

      const { data } = await onCheckProductWishlist({
        variables: {
          shopperId: email,
          productId: productId.split('-')[0],
        },
      });

      return data.checkList?.listIds[0] || null;
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('productId', productId);
        scope.setExtra('skuId', skuId);
        Sentry.captureException(err);
      });

      return null;
    }
  }, [email, onCheckProductWishlist]);

  const removeFromWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!verifyAuthentication()) return false;

      const wishlistItemId = await checkIfProductIsInWishlist(productId, skuId);

      if (!wishlistItemId) return false;

      const { data } = await onRemoveWishlist({
        variables: {
          shopperId: email,
          id: wishlistItemId,
        },
      });

      EventProvider.logEvent('product_wishlist', { product_id: productId, favorite: 0 });

      return data?.wishlistRemoveProduct;
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('productId', productId);
        scope.setExtra('skuId', skuId);
        Sentry.captureException(err);
      });

      return false;
    }
  }, [verifyAuthentication, checkIfProductIsInWishlist, onRemoveWishlist, email]);

  return {
    loading: loadingAdd || loadingRemove,
    addToWishlist,
    removeFromWishlist,
    checkIfProductIsInWishlist,
  };
}
