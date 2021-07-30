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
    const { productId } = action.payload

    const { data } = yield call(apiBffProducts.get, `product/${productId}`)

    let colors = data.skuList?.map((x) => x.color) || []
    let sizes = data.skuList?.map((x) => x.size) || []

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
