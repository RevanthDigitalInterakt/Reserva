import { useCallback, useEffect, useState } from 'react';

import { useWishlistLegacy } from './useWishlistLegacy';
import EventProvider from '../utils/EventProvider';
import { getDitoUserID } from '../utils/Dito/src/utils/getDitoUserID';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import type { ProductQuery } from '../base/graphql/generated';
import { getProductCategories } from '../utils/getProductCategories';

interface IUseWishlistProductActions {
  productDetail: ProductQuery['product'];
  productId: string;
  skuId: string;
}

export function useWishlistProductActions({
  productDetail,
  productId,
  skuId,
}: IUseWishlistProductActions) {
  const {
    removeFromWishlist,
    addToWishlist,
    checkIfProductIsInWishlist,
    loading,
  } = useWishlistLegacy();

  const { profile } = useAuthStore(['profile']);

  const trackEventDitoAddWishlist = useCallback(async (item: ProductQuery['product'], prodId: string) => {
    try {
      const id = await getDitoUserID(profile?.email || '');

      EventProvider.sendTrackEvent('adicionou-produto-a-wishlist', {
        id,
        action: 'adicionou-produto-a-wishlist',
        data: {
          id_produto: prodId,
          cor: item.initialColor?.colorName || 'Branco',
          tamanho: item.initialSize?.size || 'P',
          nome_categoria: getProductCategories(item.categoryTree),
          nome_produto: item.productName,
          marca: item.categoryTree[0],
          preco_produto: item.priceRange.sellingPrice.lowPrice,
          origem: 'app',
        },
      });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [profile?.email]);

  const [isFavorited, setIsFavorited] = useState(false);

  const onToggleFavorite = useCallback(async () => {
    setIsFavorited(!isFavorited);

    if (isFavorited) {
      await removeFromWishlist(productId, skuId);
      setIsFavorited(false);
      return;
    }

    await addToWishlist(productId, skuId);
    await trackEventDitoAddWishlist(productDetail, productId);
    setIsFavorited(true);
  }, [
    isFavorited,
    addToWishlist,
    productId,
    skuId,
    trackEventDitoAddWishlist,
    productDetail,
    removeFromWishlist,
  ]);

  useEffect(() => {
    if (productId && skuId) {
      checkIfProductIsInWishlist(productId, skuId).then(setIsFavorited);
    }
  }, [productId, skuId, checkIfProductIsInWishlist, setIsFavorited]);

  return { loading, isFavorited, onToggleFavorite };
}
