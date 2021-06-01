import { action } from 'typesafe-actions'
import { CouponsOrders, OrderItems, OrderRequest, OrdersTypes } from './types'

export const loadRequest = (orderRequestParams: OrderRequest) =>{
  console.log(orderRequestParams)
  action(OrdersTypes.ORDER_REQUEST)}

export const loadSuccess = (data: any[]) =>
  action(OrdersTypes.ORDER_SUCCESS, { data })

export const loadFailure = () => action(OrdersTypes.ORDER_FAILURE)

//? ORDERS ACTIONS
export const appendOrders = (orderItem: OrderItems) =>
  action(OrdersTypes.APPEND_ORDERS, { orderItem });

export const removeOrders = (orderSku: string) =>
  action(OrdersTypes.REMOVE_ORDERS, { orderSku });

export const setOrders = (orderList: OrderItems[]) =>
  action(OrdersTypes.SET_ORDERS, { orderList });

//? COUPONS ACTIONS
export const appendCoupons = (couponItem: CouponsOrders) =>
  action(OrdersTypes.APPEND_COUPONS, { couponItem });

export const removeCoupons = (couponId: string) =>
  action(OrdersTypes.REMOVE_COUPONS, { couponId });

export const setCoupons = (couponsList: CouponsOrders[]) =>
  action(OrdersTypes.SET_COUPONS, { couponsList });
