//#region Action Types

import { Product } from '../product/types'

export enum WishlistTypes {
  APPEND_WISHLIST = '@wishlist/APPEND_WISHLIST',
  REMOVE_WISHLIST = '@wishlist/REMOVE_WISHLIST',
  SET_WISHLIST = '@wishlist/SET_WISHLIST',
}

//#endregion

//#region Data Types

//#region

//#region State Type

interface Wish extends Product {
  category: string
}

export interface WishlistState {
  readonly data: Wish[]
}

//#region
