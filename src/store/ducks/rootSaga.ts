import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { RepositoriesTypes } from './repositories/types';

import { load } from './repositories/sagas';
import { load as loadCategories } from './categories/sagas';
import { CategoriesTypes } from './categories/types';

import { ProductsTypes } from './products/types';
import { loadProducts } from './products/sagas';

import { AuthenticationTypes } from './authentication/types';
import { login } from './authentication/sagas';

import { ProfileTypes } from './profile/types';
import { profileLoad, profileUpdate, register } from './profile/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(ProductsTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
    takeLatest(RepositoriesTypes.LOAD_REQUEST, load),
    takeLatest(CategoriesTypes.LOAD_REQUEST, loadCategories),
    takeLatest(AuthenticationTypes.LOGIN, login),
    takeLatest(ProfileTypes.PROFILE_LOAD, profileLoad),
    takeLatest(ProfileTypes.PROFILE_UPDATE, profileUpdate),
    takeLatest(ProfileTypes.REGISTER, register),
  ]);
}
