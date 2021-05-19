import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { loadAddressSuccess, loadAddressFailure } from './actions';

const api = axios.create({
  baseURL: 'https://reserva-gateway.gateway.linkapi.solutions/v1/profiles/current/addresses'
});

export function* loadAddress() {
  try {
    const { data } = yield call(
      api.get,
      'reserva.json?cachekey=202132157'
    );

    yield put(loadAddressSuccess(data.categories));
  } catch (err) {
    yield put(loadAddressFailure());
  }
}
