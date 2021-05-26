import { Reducer } from 'redux'
import { ProductState, ProductTypes } from './types'

const INITIAL_STATE: ProductState = {
  data: {
    colors: [],
    creationDate: '',
    currency: '',
    description: '',
    discountPrice: 0,
    discountTag: '0',
    fullPrice: 0,
    id: '',
    imageUrl: '',
    title: '',
    installmentNumber: 0,
    installmentPrice: 0,
    isFavorite: false,
    sizes: [],
    skuList: [],
  },
  error: false,
  loading: false,
}

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductTypes.LOAD_PRODUCT_REQUEST:
      return { ...state, loading: true, productId: action.payload.productId }
    case ProductTypes.LOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      }
    case ProductTypes.LOAD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default reducer
