import { useColorScheme } from 'react-native'
import { Product } from './types'
import axios from 'axios'
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects'

import { loadProductsSuccess, loadProductsFailure } from './actions'
import { apiBffProducts } from '../../../services/api'
import { env } from '../../../config/env'
import { AnyAction } from 'redux'

export function* loadProducts({
  ...action
}): Generator<
  CallEffect<any> | PutEffect<AnyAction>,
  void,
  { data: BffProductsResponse }
> {
  try {
    const categoryId = action.payload.data.categoryId
    const { data } = yield call(
      apiBffProducts.get,
      `products?categoryId=${categoryId}`
    )
    console.log('response', data)
    //data.products
    yield put(loadProductsSuccess([...data.products]))
  } catch (err) {
    yield put(loadProductsFailure())
  }
}

interface BffProductsResponse {
  banner: string
  fillters: {
    colors: string[]
    sizes: string[]
    maxPrice: number
    minPricec: number
    categories: { id: string; description: string }[]
  }
  products: Product[]
}
