import { Reducer } from 'redux';
import { ProductsState, ProductsTypes } from './types';

const INITIAL_STATE: ProductsState = {
  dataOffer: [],
  error: false,
  loading: false,
};

const reducer: Reducer<ProductsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsTypes.LOAD_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case ProductsTypes.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dataOffer: action.payload.dataOffer,
      };
    case ProductsTypes.LOAD_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
