//#region Action Types

export enum ProductsTypes {
  LOAD_PRODUCTS_REQUEST = '@products/LOAD_PRODUCTS_REQUEST',
  LOAD_PRODUCTS_SUCCESS = '@products/LOAD_PRODUCTS_SUCCESS',
  LOAD_PRODUCTS_FAILURE = '@products/LOAD_PRODUCTS_FAILURE',
}

//#endregion

//#region Data Types

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  primaryImage: string;
  images: string[];
  price: number;
}

//#region

//#region State Type

export interface ProductsState {
  readonly dataOffer: Product[];
  readonly loading: boolean;
  readonly error: boolean;
}

//#region
