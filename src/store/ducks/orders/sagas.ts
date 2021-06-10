import { call, put } from 'redux-saga/effects'
import { apiCategories } from '../../../services/api'
import { loadSuccess, loadFailure } from './actions'

export function* load() {
  try {
    // yield put(loadSuccess(data.categories));
  } catch (err) {
    // yield put(loadFailure());
  }
}
