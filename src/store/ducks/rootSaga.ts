import { all, takeLatest }  from 'redux-saga/effects';

import { RepositoriesTypes } from './repositories/types';

import { load } from './repositories/sagas';

import { ProductsTypes } from './products/types';
import { loadProducts } from './products/sagas';

export default function* rootSaga() {
    return yield all([
        takeLatest(ProductsTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
        takeLatest(RepositoriesTypes.LOAD_REQUEST, load),
    ]);
}