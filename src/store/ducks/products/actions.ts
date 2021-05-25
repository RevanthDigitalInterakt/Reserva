import { BffGetProductsRequest } from './sagas'
import { action } from 'typesafe-actions'
import { ProductsTypes } from './types'
import { Product } from '../product/types'

export const loadProducts = (requestParams?: BffGetProductsRequest) =>
  action(ProductsTypes.LOAD_PRODUCTS_REQUEST, { data: { requestParams } })

export const cleanProducts = () => action(ProductsTypes.LOAD_PRODUCTS_CLEAN)

export const loadProductsSuccess = (dataOffer: Product[]) =>
  action(ProductsTypes.LOAD_PRODUCTS_SUCCESS, { dataOffer })

export const loadProductsFailure = () =>
  action(ProductsTypes.LOAD_PRODUCTS_FAILURE)
