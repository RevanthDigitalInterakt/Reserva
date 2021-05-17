import { action } from 'typesafe-actions'
import { ProductsTypes, Product } from './types'

export const loadProducts = () => action(ProductsTypes.LOAD_PRODUCTS_REQUEST)

export const loadProductsSuccess = (dataOffer: Product[]) =>
  action(ProductsTypes.LOAD_PRODUCTS_SUCCESS, { dataOffer: dataOffer })

export const loadProductsFailure = () =>
  action(ProductsTypes.LOAD_PRODUCTS_FAILURE)
