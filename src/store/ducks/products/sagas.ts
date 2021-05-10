import axios from 'axios';
import { call, put } from  'redux-saga/effects';

// import api from '../../../services/api';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com/'
});

import { loadProductsSuccess, loadProductsFailure } from './actions';

export function* loadProducts() {
    try {
       const response = yield call(api.get, 'products');
       
       yield put(loadProductsSuccess(response.data));
    } catch(err) {
        yield put(loadProductsFailure());
    }
}