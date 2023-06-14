import { useCallback } from 'react';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, useMutation } from '@apollo/client';

import EventProvider from '../utils/EventProvider';
import wishListQueries from '../graphql/wishlist/wishList';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { useApolloFetchPolicyStore } from '../zustand/useApolloFetchPolicyStore';

export function useWishlistLegacy() {
  const navigation = useNavigation();
  const { profile } = useAuthStore(['profile']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

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
      notifyOnNetworkStatusChange: true,
    },
  );

  const verifyAuthentication = useCallback(() => {
    if (!profile?.email) {
      navigation.navigate('Login', { comeFrom: 'Favorite' });
      return false;
    }

    return true;
  }, [profile?.email, navigation]);

  const addToWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!verifyAuthentication()) return false;
      const { data } = await onAddWishlist({
        variables: {
          shopperId: profile?.email,
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
  }, [verifyAuthentication, onAddWishlist, profile?.email]);

  const checkIfProductIsInWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!profile?.email || !productId || !skuId) return false;
      const { data } = await onCheckProductWishlist({
        variables: {
          shopperId: profile?.email,
          productId: productId.split('-')[0],
        },
        fetchPolicy: getFetchPolicyPerKey('getWishlist'),
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
  }, [profile?.email, getFetchPolicyPerKey, onCheckProductWishlist]);

  const removeFromWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!verifyAuthentication()) return false;

      const wishlistItemId = await checkIfProductIsInWishlist(productId, skuId);

      if (!wishlistItemId) return false;

      const { data } = await onRemoveWishlist({
        variables: {
          shopperId: profile?.email,
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
  }, [verifyAuthentication, checkIfProductIsInWishlist, onRemoveWishlist, profile?.email]);

  return {
    loading: loadingAdd || loadingRemove,
    addToWishlist,
    removeFromWishlist,
    checkIfProductIsInWishlist,
  };
}
