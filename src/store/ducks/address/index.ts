import { Reducer } from 'redux';
import { AddressState, AddressTypes } from './types';

const INITIAL_STATE: AddressState = {
  data: [],
  error: false,
  loading: false,
  defaultAddress: {},
};

const reducer: Reducer<AddressState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddressTypes.LOAD_ADDRESS_REQUEST:
      return { ...state, loading: true, error: false };
    case AddressTypes.LOAD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case AddressTypes.LOAD_ADDRESS_FAILURE:
      return { ...state, loading: false, error: true };

    case AddressTypes.CREATE_ADDRESS_REQUEST:
      return { ...state, loading: true, payload: action.payload.dataAddress };

    case AddressTypes.DELETE_ADDRESS_REQUEST:
      return { ...state, loading: true, payload: action.payload.addressId };

    case AddressTypes.UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true, payload: action.payload.dataAddress };

    case AddressTypes.DEFAULT_ADDRESS_REQUEST:
      return { ...state, loading: true, defaultAddress: action.payload.addressDefault }

    case AddressTypes.DELETE_DEFAULT_ADDRESS:
      return { ...state, loading: true, defaultAddress: {} }
    default:
      return { ...state };
  }
};

export default reducer;
