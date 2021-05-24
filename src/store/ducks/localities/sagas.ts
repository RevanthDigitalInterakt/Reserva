
import { call, put } from 'redux-saga/effects';
import { api } from "../../../services/api";
import { loadLocalitiesSuccess, loadLocalitiesFailure } from './actions';

export function* loadLocalities() {
    try {
        const { data } = yield call(api.get, 'localidades/estados');
        console.log('localidades', data)
        yield put(loadLocalitiesSuccess(data));
    } catch (err) {
        yield put(loadLocalitiesFailure());
    }
}
