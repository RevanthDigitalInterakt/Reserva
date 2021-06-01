import { action } from 'typesafe-actions'
import { Product } from '../product/types'
import { CouponsOrders, OrderItems, OrderRequest, OrdersTypes } from './types'

export const loadRequest = (orderRequestParams: OrderRequest) =>{
  console.log(orderRequestParams)
  action(OrdersTypes.ORDER_REQUEST)}

export const loadSuccess = (data: any[]) =>
  action(OrdersTypes.ORDER_SUCCESS, { data })

export const loadFailure = () => action(OrdersTypes.ORDER_FAILURE)

//? ORDERS ACTIONS
export const appendOrders = (product: Product & OrderItems) =>
  action(OrdersTypes.APPEND_ORDERS, { product });

export const removeOrders = (productId: string) =>
  action(OrdersTypes.REMOVE_ORDERS, { productId });

export const setOrders = (productList: [Product & OrderItems]) =>
  action(OrdersTypes.SET_ORDERS, { productList });

//? COUPONS ACTIONS
export const appendCoupons = (couponItem: CouponsOrders) =>
  action(OrdersTypes.APPEND_COUPONS, { couponItem });

export const removeCoupons = (couponId: string) =>
  action(OrdersTypes.REMOVE_COUPONS, { couponId });

export const setCoupons = (couponsList: CouponsOrders[]) =>
  action(OrdersTypes.SET_COUPONS, { couponsList });
