import { useCallback, useEffect, useState } from 'react';

import EventProvider from '../utils/EventProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import useWishlistStore, { type IWishlistProduct } from '../zustand/useWishlistStore';
import { navigateUsingRef } from '../utils/navigationRef';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { trackClickAlgoliaStore } from '../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import { TrackEventTypeEnum, TrackEventNameEnum } from '../base/graphql/generated';
import { useSearchStore } from '../zustand/useSearchStore';

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
          'remove_from_wishlist',
          {
            value: product.lowPrice,
            currency: 'BRL',
            items: [newItem],
          },
        );

        return;
      }

 
      EventProvider.logEvent(
        'add_to_wishlist',
        {
          value: product.lowPrice,
          currency: 'BRL',
          items: [newItem],
        },
      );

      const { queryID } = useSearchStore.getState();
      trackClickAlgoliaStore.getState().onTrack({
        typeEvent: TrackEventTypeEnum.Conversion,
        nameEvent: queryID
          ? TrackEventNameEnum.ConvertedItemsSearch
          : TrackEventNameEnum.ConvertedItems,
        sku: [product?.ean || ''],
        queryID,
        dataObject: [{
          discount: 0,
          price: product.lowPrice || 1,
          quantity: 1,
        }],
        totalPrice: product.lowPrice || 1,
      });

      await onFavorite(product);
    } catch (err) {
      ExceptionProvider.captureException(err, "onToggleFavorite - useWishlistActions.ts", { product: (JSON.stringify(product) || "") });
    } finally {
      setLoadingSkuId(undefined);
    }
  }, [verifyAuthentication, checkIsFavorite, onFavorite, onUnfavorite]);

  return { onToggleFavorite, checkIsFavorite, loadingSkuId };
}
