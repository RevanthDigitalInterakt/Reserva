import { action } from 'typesafe-actions';
import { AddressTypes, Address } from './types';

export const loadAddress = () => action(AddressTypes.LOAD_ADDRESS_REQUEST);

export const loadAddressSuccess = (data: Address[]) =>
  action(AddressTypes.LOAD_ADDRESS_SUCCESS, { data });

export const loadAddressFailure = () => action(AddressTypes.LOAD_ADDRESS_FAILURE);
