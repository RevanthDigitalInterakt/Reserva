import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import {
  ShippingMethodState,
  ShippingMethodTypes,
  ShippingMethod,
  ShippingMethodResponse,
} from './types';

const INITIAL_STATE: ShippingMethodState = {
  data: {} as ShippingMethodResponse,
  error: false,
  loading: false,
};

const reducer: Reducer<Readonly<ShippingMethodState>> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case ShippingMethodTypes.LOAD_REQUEST:
      return { ...state, loading: true, error: false };
    case ShippingMethodTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case ShippingMethodTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export const shippingMethodStateSelector = (state: ApplicationState) =>
  state.shippingMethod.data;

export default reducer;
