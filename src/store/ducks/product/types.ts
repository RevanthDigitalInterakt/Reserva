//#region Action Types

export enum ProductTypes {
  LOAD_PRODUCT_REQUEST = "@product/LOAD_PRODUCT_REQUEST",
  LOAD_PRODUCT_SUCCESS = "@product/LOAD_PRODUCT_SUCCESS",
  LOAD_PRODUCT_FAILURE = "@product/LOAD_PRODUCT_FAILURE",
}

//#endregion

//#region Data Types

export interface ProductSKU {
  title: string;
  description: string;
  size: string;
  color: string;
  imagesUrls: string[];
}

export interface Product {
  id: string;
  title: string;
  imageUrl?: string;
  isFavorite: boolean;
  fullPrice: number;
  discountPrice: number;
  currency: string;
  installmentPrice: number;
  installmentNumber: number;
  discountTag: number;
  creationDate: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
  skuList?: ProductSKU[];
}

//#region

//#region State Type

export interface ProductState {
  readonly data: Product;
  readonly loading: boolean;
  readonly error: boolean;
}

//#region
