import { action } from 'typesafe-actions';
import { ProductsTypes, Product } from './types';

export const loadProducts = (categoryId: string = '') =>
  action(ProductsTypes.LOAD_PRODUCTS_REQUEST, { data: { categoryId } });

export const loadProductsSuccess = (dataOffer: Product[]) =>
  action(ProductsTypes.LOAD_PRODUCTS_SUCCESS, { dataOffer });

export const loadProductsFailure = () =>
  action(ProductsTypes.LOAD_PRODUCTS_FAILURE);
