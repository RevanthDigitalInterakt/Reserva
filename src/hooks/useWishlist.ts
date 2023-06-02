import { useCallback } from 'react';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useWishlistAddProductMutation,
  useWishlistCheckProductLazyQuery,
  useWishlistRemoveProductMutation,
} from '../base/graphql/generated';
import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';

export function useWishlist() {
  const navigation = useNavigation();
  const { profile } = useAuthStore(['profile']);

  const [onAddWishlist, { loading: loadingAdd }] = useWishlistAddProductMutation({
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

  const [onRemoveWishlist, { loading: loadingRemove }] = useWishlistRemoveProductMutation({
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

  const [onCheckProductWishlist] = useWishlistCheckProductLazyQuery({
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

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
        variables: { input: { productId, skuId } },
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
  }, [verifyAuthentication, onAddWishlist]);

  const checkIfProductIsInWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!profile?.email || !productId || !skuId) return false;

      const { data } = await onCheckProductWishlist({
        variables: { input: { productId, skuId } },
      });

      return data?.wishlistCheckProduct?.inList || false;
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('productId', productId);
        scope.setExtra('skuId', skuId);
        Sentry.captureException(err);
      });

      return false;
    }
  }, [profile?.email, onCheckProductWishlist]);

  const removeFromWishlist = useCallback(async (productId: string, skuId: string) => {
    try {
      if (!verifyAuthentication()) return false;

      const { data } = await onRemoveWishlist({
        variables: { input: { productId, skuId } },
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
  }, [verifyAuthentication, onRemoveWishlist]);

  return {
    loading: loadingAdd || loadingRemove,
    addToWishlist,
    removeFromWishlist,
    checkIfProductIsInWishlist,
  };
}
