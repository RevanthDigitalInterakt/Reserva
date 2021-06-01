import { Reducer } from 'redux'
import { OrderRequest, OrdersState, OrdersTypes } from './types'

const INITIAL_STATE: OrdersState = {
  coupons: [],
  orders: [],
  error: false,
  loading: false,
}

const reducer: Reducer<OrdersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrdersTypes.ORDER_REQUEST:
      return { ...state, loading: true }
    case OrdersTypes.ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      }
    case OrdersTypes.ORDER_FAILURE:
      return { ...state, loading: false, error: true }
    case OrdersTypes.APPEND_ORDERS:
      return {
        ...state,
        orders: state.orders.find((x) => x.sku == action.payload.orderItem.sku)
          ? state.orders
          : [...state.orders, action.payload.orderItem],
      };
    case OrdersTypes.REMOVE_ORDERS:
      return {
        ...state,
        orders:state.orders.filter((x) => x.sku != action.payload.orderSku),
      };
    case OrdersTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload.orderList,
      };
    case OrdersTypes.APPEND_COUPONS:
      return {
        ...state,
        coupons: state.coupons.find((x) => x == action.payload.couponItem)
          ? state.coupons
          : [...state.coupons, action.payload.couponItem],
      };
    case OrdersTypes.REMOVE_COUPONS:
      return {
        ...state,
        coupons: state.coupons.filter((x) => x.value != action.payload.couponId),
      };
    case OrdersTypes.SET_COUPONS:
      return {
        ...state,
        coupons: action.payload.couponsList,
      };
    default:
      return state
  }
}

export default reducer
