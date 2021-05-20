import { Product } from './types';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import { loadProductsSuccess, loadProductsFailure } from './actions';
import { api } from '../../../services/api';
import { env } from '../../../config/env';

const uniqueArray = (array: any[]) => {
  let newArray = array.filter((este, i) => array.indexOf(este) === i);
  return newArray;
};

export function* loadProducts({ ...action }) {
  try {
    const categoryId = action.payload.data.categoryId;
    console.log(categoryId);
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
      let mapedColors: any[] = [];
      item.childSKUs.forEach((x: any) => {
        let [code, name, hex] = x.consolidatedColor.split('|');
        let color = { code, name, hex };
        if (!mapedColors.find((c) => c.code == code)) mapedColors.push(color);
      });
      let product: Product = {
        id: item.id,
        title: item.displayName,
        description: item.longDescription,
        price: item.salePrices.real,
        category: item.parentCategories[0].repositoryId,
        colors: mapedColors,
        sizes: uniqueArray(item.childSKUs.map((x: any) => x.size)),
        primaryImage: `${env.BASE_URL_IMAGE}${item.primaryMediumImageURL}`,
        images: item.mediumImageURLs.map((x: string) => env.BASE_URL_IMAGE + x),
      };
      return product;
    });
    yield put(loadProductsSuccess(mapedItems));
  } catch (err) {
    yield put(loadProductsFailure());
  }
}
