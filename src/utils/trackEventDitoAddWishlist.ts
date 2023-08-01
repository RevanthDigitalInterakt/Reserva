import EventProvider from './EventProvider';
import { getDitoUserID } from './Dito/src/utils/getDitoUserID';
import type { IWishlistProduct } from '../zustand/useWishlistStore';

export async function trackEventDitoAddWishlist(item: IWishlistProduct) {
  const id = await getDitoUserID();

  EventProvider.sendTrackEvent('adicionou-produto-a-wishlist', {
    id,
    action: 'adicionou-produto-a-wishlist',
    data: {
      id_produto: item.skuId,
      cor: item.colorName,
      tamanho: item.size,
      categorias_produto: item.category,
      nome_produto: item.productName,
      marca: item.brand,
      preco_produto: item.lowPrice,
      origem: 'app',
    },
  });
}
