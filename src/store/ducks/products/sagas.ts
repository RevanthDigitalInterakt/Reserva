import { Product } from './types'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'

// import api from '../../../services/api';

const api = axios.create({
  baseURL: 'https://reserva-gateway.gateway.linkapi.solutions/v1',
  headers: {
    Authorization:
      'Basic NzFjMmZmNTAtNGUzNy00MDVmLWJhMzEtYmJlMWE2ODY4MDYxOjQyNjgxMzBkLWMwYzItNGQwYi04NTBjLTk1NzgzOWVkMzhlMw==',
  },
})

import { loadProductsSuccess, loadProductsFailure } from './actions'

export function* loadProducts() {
  try {
    const response = yield call(api.get, 'products')
    const items = response.data.response.body.items
    console.log(response.data.response.body.items)

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
