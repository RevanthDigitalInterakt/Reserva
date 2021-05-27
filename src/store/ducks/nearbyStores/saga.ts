import { call, put } from 'redux-saga/effects';

import { api } from '../../../services/api';
import { loadSuccess, loadFailure } from './actions';
import { NearbyStoresTypes, NearbyStores } from './types';

export function* loadNearbyStores({ payload }: any) {
  const { UF } = payload;

  const storeEndPoint = `occ-physicalstore-subscribe/store/state/${UF}?takeOutInStore=true`;
  try {
    const { data } = yield call(api.get, storeEndPoint);

    yield put(loadSuccess(data));
  } catch (err) {
    yield put(loadFailure());
  }
}
