import { action } from 'typesafe-actions'
import { Product, ProductTypes } from './types'

export const loadProduct = (productId: string) =>
  action(ProductTypes.LOAD_PRODUCT_REQUEST, { productId })

export const loadProductSuccess = (data: Product) =>
  action(ProductTypes.LOAD_PRODUCT_SUCCESS, { data })

export const loadProductFailure = () =>
  action(ProductTypes.LOAD_PRODUCT_FAILURE)
