import { action } from 'typesafe-actions';
import { Wish, WishlistTypes } from './types';

export const appendWishlist = (product: Wish) =>
  action(WishlistTypes.APPEND_WISHLIST, { product });

export const removeWishlist = (productId: string) =>
  action(WishlistTypes.REMOVE_WISHLIST, { productId });

export const setWishlist = (productsList: Wish[]) =>
  action(WishlistTypes.SET_WISHLIST, { productsList });
