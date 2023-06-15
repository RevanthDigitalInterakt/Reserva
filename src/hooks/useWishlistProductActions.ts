import { useCallback, useEffect, useState } from 'react';

import { useWishlistLegacy } from './useWishlistLegacy';

interface IUseWishlistProductActions {
  productId: string;
  skuId: string;
}

export function useWishlistProductActions({ productId, skuId }: IUseWishlistProductActions) {
  const {
    removeFromWishlist,
    addToWishlist,
    checkIfProductIsInWishlist,
    loading,
  } = useWishlistLegacy();

  const [isFavorited, setIsFavorited] = useState(false);

  const onToggleFavorite = useCallback(async () => {
    setIsFavorited(!isFavorited);

    if (isFavorited) {
      await removeFromWishlist(productId, skuId);
      setIsFavorited(false);
      return;
    }

    await addToWishlist(productId, skuId);
    setIsFavorited(true);
  }, [addToWishlist, isFavorited, productId, removeFromWishlist, skuId, setIsFavorited]);

  useEffect(() => {
    if (productId && skuId) {
      checkIfProductIsInWishlist(productId, skuId).then(setIsFavorited);
    }
  }, [productId, skuId, checkIfProductIsInWishlist, setIsFavorited]);

  return { loading, isFavorited, onToggleFavorite };
}
