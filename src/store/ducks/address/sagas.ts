import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { action } from 'typesafe-actions';

import { api } from "../../../services/api";
import {
  loadAddressSuccess,
  loadAddressFailure,
  loadAddress,
  createDefaultAddress
} from './actions';
import { Address } from './types';

export function* loadAddressRequest() {
  try {
    const { data } = yield call(api.get, 'profiles/current/addresses');
    yield put(loadAddressSuccess(data?.items));
  } catch (err) {
    yield put(loadAddressFailure());
  }
}

export function* createAddressRequest({ ...action }) {
  try {
    const dataAddress = action.payload.dataAddress;
    console.log('param', dataAddress)
    yield call(api.post, 'profiles/current/addresses', dataAddress);
    yield put(loadAddress());
  } catch (err) {
    yield put(loadAddressFailure());
  }
}

export function* deleteAddressRequest({ ...action }) {
  try {
    const addressId = action?.payload?.addressId;
    yield call(api.delete, `profiles/current/addresses?addressId=${addressId}`);
    yield put(loadAddress());
  } catch (err) {
    yield put(loadAddressFailure());
  }
}

export function* updateAddressRequest({ ...action }) {
  try {
    const dataAddress = action.payload.dataAddress;
    yield call(api.put, `profiles/current/addresses?addressId=${dataAddress.address.id}`, dataAddress);
    yield put(loadAddress());
  } catch (err) {
    yield put(loadAddressFailure());
  }
}


