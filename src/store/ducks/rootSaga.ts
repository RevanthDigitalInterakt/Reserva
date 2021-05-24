import { all, takeLatest, takeEvery, fork } from "redux-saga/effects";

import { load as loadCategories } from "./categories/sagas";
import { CategoriesTypes } from "./categories/types";

import { ProductsTypes } from "./products/types";
import { loadProducts } from "./products/sagas";

import { AuthenticationTypes } from "./authentication/types";
import { loginReqest, logoutRequest } from "./authentication/sagas";

import { AddressTypes } from './address/types';
import { loadAddressRequest, createAddressRequest, deleteAddressRequest, updateAddressRequest } from './address/sagas';


import { ProfileTypes } from "./profile/types";
import { profileLoad, profileUpdate, register } from "./profile/sagas";

export default function* rootSaga() {
  yield all([
    takeLatest(AuthenticationTypes.LOGIN_REQUEST, loginReqest),
    takeLatest(AuthenticationTypes.LOGOUT_REQUEST, logoutRequest),

    takeLatest(ProfileTypes.PROFILE_LOAD, profileLoad),

    takeLatest(ProductsTypes.LOAD_PRODUCTS_REQUEST, loadProducts),
    takeLatest(CategoriesTypes.LOAD_REQUEST, loadCategories),
    takeLatest(AddressTypes.LOAD_ADDRESS_REQUEST, loadAddressRequest),
    takeLatest(AddressTypes.CREATE_ADDRESS_REQUEST, createAddressRequest),
    takeLatest(AddressTypes.DELETE_ADDRESS_REQUEST, deleteAddressRequest),
    takeLatest(AddressTypes.UPDATE_ADDRESS_REQUEST, updateAddressRequest),
    takeLatest(ProfileTypes.PROFILE_UPDATE, profileUpdate),
    takeLatest(ProfileTypes.REGISTER_REQUEST, register),
  ]);
}
