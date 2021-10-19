
import { Value } from 'react-native-reanimated'
import { Reducer } from 'redux'
import { order } from 'styled-system'
import { increaseOrderCount } from './actions'
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

    case OrdersTypes.ORDER_COUNT_INCREASE:
      return {
        ...state,
        orders: state.orders.map((x) => {
          let newQuantity = x.quantity + action.payload.value
          return action.payload.sku == x.sku && newQuantity > 0
            ? { ...x, quantity: newQuantity }
            : { ...x }
        }),
      }
    case OrdersTypes.APPEND_ORDERS:
      let orderInArray = state.orders.find(
        (order) => order.sku == action.payload.product.sku
      )
      let updatedOrders = [...state.orders]
      if (orderInArray?.quantity) {
        orderInArray.quantity += 1
        updatedOrders.map((x) => {
          if (x.sku == orderInArray?.sku) return orderInArray
          else return x
        })
      } else updatedOrders = [...updatedOrders, action.payload.product]

      return { ...state, orders: [...updatedOrders] }
    case OrdersTypes.REMOVE_ORDERS:
      return {
        ...state,
        orders: state.orders.filter((x) => x.sku != action.payload.productId),
      }
    case OrdersTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload.productList,
      }
    case OrdersTypes.APPEND_COUPONS:
      return {
        ...state,
        coupons: state.coupons.find((x) => x == action.payload.couponItem)
          ? state.coupons
          : [...state.coupons, action.payload.couponItem],
      }
    case OrdersTypes.REMOVE_COUPONS:
      return {
        ...state,
        coupons: state.coupons.filter(
          (x) => x.value != action.payload.couponId
        ),
      }
    case OrdersTypes.SET_COUPONS:
      return {
        ...state,
        coupons: action.payload.couponsList,
      }
    default:
      return state
  }
}

export default reducer
