import { useCallback, useEffect, useState } from 'react';

import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import useWishlistStore, { IWishlistProduct } from '../zustand/useWishlistStore';
import { trackEventDitoAddWishlist } from '../utils/trackEventDitoAddWishlist';
import { navigateUsingRef } from '../utils/navigationRef';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export function useWishlistActions() {
  const {
    favorites,
    onLoadFavorites,
    onUnfavorite,
    onFavorite,
  } = useWishlistStore([
    'favorites',
    'onLoadFavorites',
    'onFavorite',
    'onUnfavorite',
  ]);

  const [loadingSkuId, setLoadingSkuId] = useState<string>('');
  const { profile } = useAuthStore(['profile']);

  useEffect(() => {
    if (profile?.email) {
      onLoadFavorites();
    }
  }, [profile?.email]);

  const verifyAuthentication = useCallback(() => {
    if (!profile?.email) {
      navigateUsingRef('Login', { comeFrom: 'Favorite' });
      return false;
    }

    return true;
  }, [profile?.email]);

  const checkIsFavorite = useCallback((skuId: string) => (
    favorites.includes(skuId)
  ), [favorites]);

  const onToggleFavorite = useCallback(async (product: IWishlistProduct) => {
    try {
      if (!verifyAuthentication()) return;

      setLoadingSkuId(product.skuId);

      const isFavorite = checkIsFavorite(product.skuId);

      const newItem = {
        price: product.lowPrice ?? 0,
        item_id: product?.productId,
        quantity: 1,
        item_name: product?.productName,
        item_variant: product?.skuName,
        item_category: 'product',
      };

      if (isFavorite) {
        await onUnfavorite(product);
        EventProvider.logEvent(
          'add_to_wishlist',
          {
            value: product.lowPrice,
            currency: 'BRL',
            items: [newItem],
          },
        );

        return;
      }

      trackEventDitoAddWishlist(product);
      EventProvider.logEvent(
        'add_to_wishlist',
        {
          value: product.lowPrice,
          currency: 'BRL',
          items: [newItem],
        },
      );

      await onFavorite(product);
    } catch (err) {
      ExceptionProvider.captureException(err, { product });
    } finally {
      setLoadingSkuId(undefined);
    }
  }, [verifyAuthentication, checkIsFavorite, onFavorite, onUnfavorite]);

  return { onToggleFavorite, checkIsFavorite, loadingSkuId };
}
