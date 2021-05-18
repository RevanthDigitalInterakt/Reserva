import { Product } from './types'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'

import { loadProductsSuccess, loadProductsFailure } from './actions'
import { api } from '../../../services/api'

export function* loadProducts({ ...action }) {
  try {
    const categoryId = action.payload.data.categoryId

    const {
      data: { response, request },
    } = yield call(
      api.get,
      `products${categoryId != '' ? '?categoryId=' + categoryId : ''}`
    )

    const items: any = response.body.items
    console.log(response)

    yield put(
      loadProductsSuccess(
        items.map((item: any) => {
          let product: Product = {
            id: item.id,
            title: item.displayName,
            description: item.description,
            price: item.salePrices.real,
            category: item.parentCategories[0].repositoryId,
            images: item.childSKUs[0].fullImageURLs.map(
              (x: any) => `https://www.usereserva.com${x}`
            ),
          }
          return product
        })
      )
    )
  } catch (err) {
    yield put(loadProductsFailure())
  }
}
