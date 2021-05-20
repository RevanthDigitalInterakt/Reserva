import { all, takeLatest, takeEvery, fork } from "redux-saga/effects";

import { load as loadCategories } from "./categories/sagas";
import { CategoriesTypes } from "./categories/types";

import { ProductsTypes } from "./products/types";
import { loadProducts } from "./products/sagas";

import { AuthenticationTypes } from "./authentication/types";
import { login } from "./authentication/sagas";

import { ProfileTypes } from "./profile/types";
import {
  loadProfile,
  profileLoad,
  profileUpdate,
  register,
} from "./profile/sagas";

export default function* rootSaga() {
  yield all([fork(login), fork(loadProfile)]);

  // yield all([
  //   takeLatest(ProductsTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
  //   takeLatest(CategoriesTypes.LOAD_REQUEST, loadCategories),
  //   takeLatest(AuthenticationTypes.LOGIN_REQUEST, login),
  //   takeLatest(ProfileTypes.PROFILE_LOAD, profileLoad),
  //   takeLatest(ProfileTypes.PROFILE_UPDATE, profileUpdate),
  //   takeLatest(ProfileTypes.REGISTER_REQUEST, register),
  // ]);
}
