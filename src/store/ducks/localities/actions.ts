import { action } from 'typesafe-actions';
import { LocalitiesTypes, Localities } from './types';

export const loadLocalitiesRequest = () => action(LocalitiesTypes.LOAD_LOCALITY_REQUEST);

export const loadLocalitiesSuccess = (data: Localities[]) => action(LocalitiesTypes.LOAD_LOCALITY_SUCCESS, { data });

export const loadLocalitiesFailure = () => action(LocalitiesTypes.LOAD_LOCALITY_FAILURE);
