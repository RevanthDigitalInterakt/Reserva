import { Reducer } from 'redux'
import { WishlistTypes, WishlistState } from './types'

const INITIAL_STATE: WishlistState = {
  data: [],
}

const reducer: Reducer<WishlistState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WishlistTypes.APPEND_WISHLIST:
      return {
        ...state,
        data: state.data.find((x) => x.id == action.payload.product.id)
          ? state.data
          : [...state.data, action.payload.product],
      }
    case WishlistTypes.REMOVE_WISHLIST:
      return {
        ...state,
        data: state.data.filter((x) => x.id != action.payload.product.id),
      }
    case WishlistTypes.SET_WISHLIST:
      return {
        ...state,
        data: action.payload.productsList,
      }
    default:
      return state
  }
}

export default reducer
