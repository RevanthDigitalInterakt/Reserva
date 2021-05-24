import { action } from 'typesafe-actions';
import { AddressTypes, Address } from './types';

export const loadAddress = () => action(AddressTypes.LOAD_ADDRESS_REQUEST);

export const loadAddressSuccess = (data: Address[]) =>
  action(AddressTypes.LOAD_ADDRESS_SUCCESS, { data });

export const loadAddressFailure = () => action(AddressTypes.LOAD_ADDRESS_FAILURE);

export const createAddress = (dataAddress: any) => action(AddressTypes.CREATE_ADDRESS_REQUEST, { dataAddress });

// export const createAddressSuccess = (dataAddress: Address[]) => action(AddressTypes.CREATE_ADDRESS_SUCCESS, { dataAddress });

// export const createAddressFailure = () => action(AddressTypes.CREATE_ADDRESS_FAILURE);

export const deleteAddress = (addressId: string) => action(AddressTypes.DELETE_ADDRESS_REQUEST, { addressId });

export const createDefaultAddress = (addressDefault: Address) => action(AddressTypes.DEFAULT_ADDRESS_REQUEST, { addressDefault });
export const deleteDefautAddress = () => action(AddressTypes.DELETE_DEFAULT_ADDRESS);