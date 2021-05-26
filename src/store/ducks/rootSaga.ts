import { all, takeLatest, takeEvery, fork } from "redux-saga/effects";

import { load as loadCategories } from "./categories/sagas";
import { CategoriesTypes } from "./categories/types";

import { ProductsTypes } from "./products/types";
import { loadProducts } from "./products/sagas";

import { AuthenticationTypes } from "./authentication/types";
import {
  loginReqest,
  logoutRequest,
  restoreSessionToken,
} from "./authentication/sagas";

import { AddressTypes } from "./address/types";
import {
  loadAddressRequest,
  createAddressRequest,
  deleteAddressRequest,
  updateAddressRequest,
} from "./address/sagas";

import { ProfileTypes } from "./profile/types";
import { profileLoad, profileUpdate, register } from "./profile/sagas";
import { ProductTypes } from "./product/types";
import { loadProduct } from "./product/sagas";

import { LocalitiesTypes } from "./localities/types";
import { loadLocalities, loadCounty } from "./localities/sagas";

export default function* rootSaga() {
  yield all([
    takeLatest(AuthenticationTypes.RESTORE_SESSION, restoreSessionToken),
    takeLatest(AuthenticationTypes.LOGIN_REQUEST, loginReqest),
    takeLatest(AuthenticationTypes.LOGOUT_REQUEST, logoutRequest),

    takeLatest(ProfileTypes.PROFILE_LOAD, profileLoad),
    takeLatest(ProfileTypes.PROFILE_UPDATE, profileUpdate),

    takeLatest(ProductsTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
    takeLatest(ProductTypes.LOAD_PRODUCT_REQUEST, loadProduct),
    takeLatest(CategoriesTypes.LOAD_REQUEST, loadCategories),

    takeLatest(AddressTypes.LOAD_ADDRESS_REQUEST, loadAddressRequest),
    takeLatest(AddressTypes.CREATE_ADDRESS_REQUEST, createAddressRequest),
    takeLatest(AddressTypes.DELETE_ADDRESS_REQUEST, deleteAddressRequest),
    takeLatest(AddressTypes.UPDATE_ADDRESS_REQUEST, updateAddressRequest),

    takeLatest(ProfileTypes.PROFILE_UPDATE, profileUpdate),
    takeLatest(ProfileTypes.REGISTER_REQUEST, register),

    takeLatest(LocalitiesTypes.LOAD_STATES_REQUEST, loadLocalities),
    takeLatest(LocalitiesTypes.LOAD_COUNTIES_REQUEST, loadCounty),
  ]);
}
