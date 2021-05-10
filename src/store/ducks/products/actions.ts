import { action } from 'typesafe-actions';
import { ProductsTypes, Product } from './types';

export const loadProducts = () => action(ProductsTypes.LOAD_PRODUCTS_REQUEST);

export const loadProductsSuccess = (data: Product[]) => action(ProductsTypes.LOAD_PRODUCTS_SUCCESS, { data });

export const loadProductsFailure = () => action(ProductsTypes.LOAD_PRODUCTS_FAILURE);