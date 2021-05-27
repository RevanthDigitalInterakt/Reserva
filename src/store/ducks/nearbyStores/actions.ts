import { action } from 'typesafe-actions';
import { NearbyStoresResponse, NearbyStoresTypes } from './types';

export const load = (payload: { UF: string }) => {
  return action(NearbyStoresTypes.LOAD_REQUEST, payload);
};

export const loadSuccess = (data: NearbyStoresResponse) =>
  action(NearbyStoresTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(NearbyStoresTypes.LOAD_FAILURE);
