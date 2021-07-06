import { AnyAction } from 'redux'
import { call, CallEffect, put, PutEffect } from 'redux-saga/effects'
import { api, apiBffProducts } from '../../../services/api'
import { loadProductFailure, loadProductSuccess } from './actions'
import { Product } from './types'

const unique = (val: any, idx: any, self: any) => self.indexOf(val) === idx

export function* loadProduct({
  ...action
}): Generator<CallEffect<any> | PutEffect<AnyAction>, void, { data: Product }> {
  try {
    console.log('request params product', action)
    const { productId } = action.payload

    console.log(productId);
    const { data } = yield call(apiBffProducts.get, `product/${productId}`)

    let colors = data.skuList?.map((x) => x.color) || []
    let sizes = data.skuList?.map((x) => x.size) || []

    console.log('response product', data)
    yield put(
      loadProductSuccess({
        colors: colors.filter(unique),
        sizes: sizes.filter(unique),
        ...data,
      })
    )
  } catch (err) {
    yield put(loadProductFailure())
  }
}
