import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { action } from 'typesafe-actions';
import { apiCategories } from '../../../services/api';
import { loadAddressSuccess, loadAddressFailure, createAddressSuccess, createAddressFailure } from './actions';

const api = axios.create({
  baseURL: 'https://reserva-gateway.gateway.linkapi.solutions/v1/'
});

api.defaults.headers.common['Authorization'] =
  'Basic YmY3ZWRlYTMtYmMwOS00OTUxLWIwZDMtYmI0MTI0MjUyNTdjOjkyZTA1MDQ0LTY0ODctNGMxNS05ZDMyLTRmZmQ0NmNkYTYyZA==';

api.defaults.headers.common['client-token'] =
  'eyJhbGciOiJSUzI1NiIsImprdSI6ImExNTQ5NTQ3YzFUU1QiLCJraWQiOiIyIiwieDVjIjpudWxsLCJ4NXUiOiJodHRwczovL2ExNTQ5NTQ3YzF0c3QtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL2Njc3RvcmUvdjEvdGVuYW50Q2VydENoYWluIn0=.eyJpYXQiOjE2MjE1MTgzOTcsImV4cCI6MTYyMTUxOTMyNywic3ViIjoiMTYwOTE2MDAiLCJhdWQiOiJzdG9yZWZyb250IiwiY29tLm9yYWNsZS5hdGcuY2xvdWQuY29tbWVyY2Uucm9sZXMiOm51bGwsIm9jY3MuYWRtaW4ucm9sZXMiOm51bGwsImlzcyI6Imh0dHBzOi8vYTE1NDk1NDdjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vIiwib2Njcy5hZG1pbi5sb2NhbGUiOiJlbl9VUyIsIm9jY3MuYWRtaW4udHoiOm51bGwsIm9jY3MuYWRtaW4udGVuYW50VHoiOiJBbWVyaWNhL1Nhb19QYXVsbyIsIm9jY3MuYWRtaW4ua2VlcEFsaXZlVVJMIjoiaHR0cHM6Ly9hMTU0OTU0N2MxdHN0LWFkbWluLm9jY2Eub2NzLm9yYWNsZWNsb3VkLmNvbS8iLCJvY2NzLmFkbWluLnRva2VuUmVmcmVzaFVSTCI6Imh0dHBzOi8vYTE1NDk1NDdjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NzdG9yZS92MS9zc29Ub2tlbnMvcmVmcmVzaCIsIm9jY3MuYWRtaW4udmVyc2lvbiI6IjIxLjIuMSIsIm9jY3MuYWRtaW4uYnVpbGQiOiJqZW5raW5zLUFzc2VtYmxlX0Nsb3VkX0NvbW1lcmNlX0VBUnNfLW1hc3Rlci05MSIsIm9jY3MuYWRtaW4uZW1haWwiOm51bGwsIm9jY3MuYWRtaW4ucHJvZmlsZUlkIjoiMTYwOTE2MDAiLCJvY2NzLmFnZW50Lm9ibyI6bnVsbCwib2Njcy5hZG1pbi5maXJzdE5hbWUiOm51bGwsIm9jY3MuYWRtaW4ubGFzdE5hbWUiOm51bGwsIm9jY3MuYWRtaW4ucHVuY2hvdXRVc2VyIjpmYWxzZSwic3ViX3R5cGUiOm51bGwsInNjb3BlIjpudWxsfQ==.QnUY9b4/+rIS12NIKn+PgFWyzykFwNKitRxHQBFAFMP6E0AvRN0F1oFU0v+g0ST/wt5JbK85xiUYf43G+ssux++0vwJJTIiiHbm6y4yW+imB1BY87FXhOF9IiIF3mFlTaLf6k8hgxllqW/xI6uMjxAGZwUWw9w9IEze+aUD4uph5T/ql5hr8IFX4D9SFOesxCUheDJFJOANtA4v0oxSOQ2EwU7gK+ndMfKIwLq4uB+PW+L7j/6cctc9S4VmPI4zo6auw+k6/IRiHfJmMI2HlHjusO6YL2t6UeoBq+/uFzjxb7KfCVtmr/sMt+XEWieni6q0UcOZqXDJsugE2y+o5Xw=='

export function* loadAddress() {
  try {
    const response = yield call(api.get, 'profiles/current/addresses');
    yield put(loadAddressSuccess(response.data?.items));
  } catch (err) {
    yield put(loadAddressFailure());
  }
}

export function* createAddress({ ...action }) {
  try {
    const param = action.payload.data;
    console.log('param', param)

    const { response } = yield call(api.post, 'profiles/current/addresses', {

    });
    yield put(loadAddressSuccess(response.data));
  } catch (err) {
    yield put(loadAddressFailure());
  }
}


// export function* loadProducts({ ...action }) {
//   try {
//     const categoryId = action.payload.data.categoryId;

//     const {
//       data: { response },
//     } = yield call(
//       api.get,
//       `products${categoryId && categoryId != '' ? '?categoryId=' + categoryId : ''
//       }`
//     );
//     const items: any = response.body.items;
//     const mapedItems = items.map((item: any) => {
//       let product: Product = {
//         id: item.id,
//         title: item.displayName,
//         description: item.description,
//         price: item.salePrices.real,
//         category: item.parentCategories[0].repositoryId,
//         images: [`https://www.usereserva.com${item.primaryMediumImageURL}`],
//       };
//       return product;
//     });
//     yield put(loadProductsSuccess(mapedItems));
//   } catch (err) {
//     yield put(loadProductsFailure());
//   }
// }
