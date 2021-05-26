import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import {
  NearbyStores,
  NearbyStoresResponse,
  NearbyStoresState,
  NearbyStoresTypes,
} from './types';

const INITIAL_STATE: NearbyStoresState = {
  data: {} as NearbyStoresResponse,
  error: false,
  loading: false,
};

const reducer: Reducer<Readonly<NearbyStoresState>> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case NearbyStoresTypes.LOAD_REQUEST:
      return { ...state, loading: true, error: false };
    case NearbyStoresTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case NearbyStoresTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export const nearbyStoresStateSelector = (state: ApplicationState) =>
  state.nearbyStores;

export default reducer;
