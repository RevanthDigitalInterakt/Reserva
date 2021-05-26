import { action } from 'typesafe-actions';
import { LocalitiesTypes, State, County } from './types';

export const loadLocalitiesRequest = () => action(LocalitiesTypes.LOAD_STATES_REQUEST);

export const loadLocalitiesSuccess = (data: State[]) => action(LocalitiesTypes.LOAD_STATES_SUCCESS, { data });

export const loadLocalitiesFailure = () => action(LocalitiesTypes.LOAD_STATES_FAILURE);

export const loadCountyResquest = (county: string) => action(LocalitiesTypes.LOAD_COUNTIES_REQUEST, { county });

export const loadCountySuccess = (dataCounty: County[]) => action(LocalitiesTypes.LOAD_COUNTIES_SUCCESS, { dataCounty });

export const loadCountyFailure = () => action(LocalitiesTypes.LOAD_COUNTIES_FAILURE);