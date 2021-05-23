//#region Action Types

export enum ProductsTypes {
  LOAD_PRODUCTS_REQUEST = '@products/LOAD_PRODUCTS_REQUEST',
  LOAD_PRODUCTS_SUCCESS = '@products/LOAD_PRODUCTS_SUCCESS',
  LOAD_PRODUCTS_FAILURE = '@products/LOAD_PRODUCTS_FAILURE',
}

//#endregion

//#region Data Types

export interface Product {
  id: string
  title: string
  imageUrl: string
  isFavorite: boolean
  fullPrice: number
  discountPrice: number
  currency: string
  installmentPrice: number
  installmentNumber: number
  discountTag: string
  creationDate: string
  colors: string[]
  sizes: string[]
}

//#region

//#region State Type

export interface ProductsState {
  readonly dataOffer: Product[]
  readonly loading: boolean
  readonly error: boolean
}

//#region
