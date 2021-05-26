import { action } from 'typesafe-actions';
import {
  ShippingMethodTypes,
  ShippingMethod,
  ShippingMethodResponse,
} from './types';

export const load = (payload: { cep: string }) => {
  return action(ShippingMethodTypes.LOAD_REQUEST, payload);
};

export const loadSuccess = (data: ShippingMethodResponse) =>
  action(ShippingMethodTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(ShippingMethodTypes.LOAD_FAILURE);
