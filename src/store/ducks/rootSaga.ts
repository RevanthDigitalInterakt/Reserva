import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { RepositoriesTypes } from './repositories/types';

import { load } from './repositories/sagas';
import { load as loadCategories } from './categories/sagas';
import { CategoriesTypes } from './categories/types';
import { AddressTypes } from './address/types';

import { ProductsTypes } from './products/types';
import { loadProducts } from './products/sagas';
import { loadAddressRequest, createAddress } from './address/sagas';


export default function* rootSaga() {
  return yield all([
    takeLatest(ProductsTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
    takeLatest(RepositoriesTypes.LOAD_REQUEST, load),
    takeLatest(CategoriesTypes.LOAD_REQUEST, loadCategories),
    takeLatest(AddressTypes.LOAD_ADDRESS_REQUEST, loadAddressRequest),
    takeLatest(AddressTypes.CREATE_ADDRESS_REQUEST, createAddress),
  ]);
}
