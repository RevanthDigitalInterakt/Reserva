
import { call, put } from 'redux-saga/effects';
import { action } from 'typesafe-actions';
import { api } from "../../../services/api";
import { loadLocalitiesSuccess, loadLocalitiesFailure, loadCountySuccess, loadCountyFailure } from './actions';

export function* loadLocalities() {
    try {
        const { data } = yield call(api.get, 'localidades/estados');
        console.log('localidades', data)
        yield put(loadLocalitiesSuccess(data));
    } catch (err) {
        yield put(loadLocalitiesFailure());
    }
}

export function* loadCounty({ ...action }) {
    try {
        const county = action.payload.county;
        console.log('action', county)
        const { data } = yield call(api.get, `localidades/estados/${county}/distritos`);
        console.log('dataStatezzz', data)
        yield put(loadCountySuccess(data));
    } catch (err) {
        yield put(loadCountyFailure());
    }
}
