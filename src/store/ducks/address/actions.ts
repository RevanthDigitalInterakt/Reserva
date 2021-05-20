import { action } from 'typesafe-actions';
import { AddressTypes, Address } from './types';

export const loadAddress = () => action(AddressTypes.LOAD_ADDRESS_REQUEST);

export const loadAddressSuccess = (data: Address[]) =>
  action(AddressTypes.LOAD_ADDRESS_SUCCESS, { data });

export const loadAddressFailure = () => action(AddressTypes.LOAD_ADDRESS_FAILURE);

export const createAddress = (dataAddress: Address[]) => action(AddressTypes.CREATE_ADDRESS_REQUEST, { dataAddress });

export const createAddressSuccess = (dataAddress: Address[]) => action(AddressTypes.CREATE_ADDRESS_SUCCESS, { dataAddress });

export const createAddressFailure = () => action(AddressTypes.CREATE_ADDRESS_FAILURE);

export const deleteAddress = () => action(AddressTypes.DELETE_ADDRESS_REQUEST);

// export const loadProducts = (categoryId: string = '') =>
//   action(ProductsTypes.LOAD_PRODUCTS_REQUEST, { data: { categoryId } });

// export const loadProductsSuccess = (dataOffer: Product[]) =>
//   action(ProductsTypes.LOAD_PRODUCTS_SUCCESS, { dataOffer });

// export const loadProductsFailure = () =>
//   action(ProductsTypes.LOAD_PRODUCTS_FAILURE);