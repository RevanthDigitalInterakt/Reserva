import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import { getApolloClient } from '../utils/getApolloClient';
import {
  WishlistAddProductDocument,
  WishlistAddProductMutation,
  WishlistAddProductMutationVariables,
  WishlistDocument,
  WishlistQuery,
  WishlistQueryVariables,
  WishlistRemoveProductDocument,
  WishlistRemoveProductMutation,
  WishlistRemoveProductMutationVariables,
} from '../base/graphql/generated';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export interface IWishlistProduct {
  skuId: string;
  productId: string;
  colorName?: string | null;
  size?: string | null;
  category?: string | null;
  productName: string;
  brand: string;
  lowPrice: number;
}

interface IWishlistStore {
  initialized: boolean;
  favorites: string[];
  onLoadFavorites: () => Promise<void>;
  onFavorite: (product: IWishlistProduct) => Promise<boolean>;
  onUnfavorite: (product: IWishlistProduct) => Promise<boolean>;
}

const useWishlistStore = create<IWishlistStore>((set, getState) => ({
  initialized: false,
  favorites: [],
  onLoadFavorites: async () => {
    try {
      if (getState().initialized) return;

      const client = await getApolloClient();

      const { data } = await client.query<WishlistQuery, WishlistQueryVariables>({
        query: WishlistDocument,
        context: { clientName: 'gateway' },
        fetchPolicy: 'no-cache',
      });

      set(() => ({ favorites: data.wishlist || [], initialized: true }));
    } catch (err) {
      //
    }
  },
  onFavorite: async (product) => {
    try {
      const client = await getApolloClient();

      const { data } = await client.mutate<
      WishlistAddProductMutation,
      WishlistAddProductMutationVariables
      >({
        mutation: WishlistAddProductDocument,
        context: { clientName: 'gateway' },
        variables: {
          input: {
            productId: product.productId,
            skuId: product.skuId,
          },
        },
      });

      set(() => ({ favorites: data?.wishlistAddProduct || [] }));

      return true;
    } catch (err) {
      ExceptionProvider.captureException(err, { product });

      return false;
    }
  },
  onUnfavorite: async (product) => {
    try {
      const client = await getApolloClient();

      const { data } = await client.mutate<
      WishlistRemoveProductMutation,
      WishlistRemoveProductMutationVariables
      >({
        mutation: WishlistRemoveProductDocument,
        context: { clientName: 'gateway' },
        variables: {
          input: {
            productId: product.productId,
            skuId: product.skuId,
          },
        },
      });

      set(() => ({ favorites: data?.wishlistRemoveProduct || [] }));

      return true;
    } catch (err) {
      ExceptionProvider.captureException(err, { product });

      return false;
    }
  },
}));

export default createZustandStoreWithSelectors(useWishlistStore);
