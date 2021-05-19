import { Product } from './types';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { loadProductsSuccess, loadProductsFailure } from './actions';
import { api } from '../../../services/api';

export function* loadProducts({ ...action }) {
  try {
    const categoryId = action.payload.data.categoryId;

    const {
      data: { response },
    } = yield call(
      api.get,
      `products${
        categoryId && categoryId != '' ? '?categoryId=' + categoryId : ''
      }`
    );
    const items: any = response.body.items;
    const mapedItems = items.map((item: any) => {
      let product: Product = {
        id: item.id,
        title: item.displayName,
        description: item.description,
        price: item.salePrices.real,
        category: item.parentCategories[0].repositoryId,
        images: [`https://www.usereserva.com${item.primaryMediumImageURL}`],
      };
      return product;
    });
    yield put(loadProductsSuccess(mapedItems));
  } catch (err) {
    yield put(loadProductsFailure());
  }
}
