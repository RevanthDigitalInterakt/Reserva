import { action } from 'typesafe-actions'
import { Product } from '../products/types'
import { WishlistTypes } from './types'

export const appendWishlist = (product: Product) =>
  action(WishlistTypes.APPEND_WISHLIST, { product })

export const removeWishlist = (product: Product) =>
  action(WishlistTypes.REMOVE_WISHLIST, { product })

export const setWishlist = (productsList: Product[]) =>
  action(WishlistTypes.SET_WISHLIST, { productsList })
