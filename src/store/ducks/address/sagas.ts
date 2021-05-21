import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { action } from 'typesafe-actions';

import { api } from "../../../services/api";
import {
  loadAddressSuccess,
  loadAddressFailure,
  createAddressSuccess,
  loadAddress
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

// export function* createAddress({ payload }: any) {
//   try {
//     const { dataAddress } = payload;
//     console.log('param', dataAddress)
//     // const { data } = yield call(api.post, 'profiles/current/addresses', dataAddress);
//     // console.log('datadata', data)
//     // yield put(loadAddressSuccess(data));
//     yield put(loadAddress());
//   } catch (err) {
//     yield put(loadAddressFailure());
//   }
// }

// export function* createAddressRequest({ ...action }) {
//   try {
//     const dataAddress = action.payload.dataAddress;
//     console.log('param', dataAddress)
//     // const { data } = yield call(api.post, 'profiles/current/addresses', dataAddress);
//     yield call(api.post, 'profiles/current/addresses', dataAddress);
//     // console.log('datadata', data)
//     // yield put(loadAddressSuccess(data));
//     yield put(loadAddress());
//   } catch (err) {
//     yield put(loadAddressFailure());
//   }
// }
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
    const addressId = action.payload.addressId;
    console.log('param', addressId)
    yield call(api.delete, `profiles/current/addresses?addressId=${addressId}`);
    yield put(loadAddress());
  } catch (err) {
    yield put(loadAddressFailure());
  }
}
// const api = axios.create({
//   baseURL: 'https://reserva-gateway.gateway.linkapi.solutions/v1/'
// });

// api.defaults.headers.common['Authorization'] =
//   'Basic YmY3ZWRlYTMtYmMwOS00OTUxLWIwZDMtYmI0MTI0MjUyNTdjOjkyZTA1MDQ0LTY0ODctNGMxNS05ZDMyLTRmZmQ0NmNkYTYyZA==';

// api.defaults.headers.common['client-token'] =
//   'eyJhbGciOiJSUzI1NiIsImprdSI6ImExNTQ5NTQ3YzFUU1QiLCJraWQiOiIyIiwieDVjIjpudWxsLCJ4NXUiOiJodHRwczovL2ExNTQ5NTQ3YzF0c3QtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL2Njc3RvcmUvdjEvdGVuYW50Q2VydENoYWluIn0=.eyJpYXQiOjE2MjE1NTM0NDgsImV4cCI6MTYyMTU1NDM3OCwic3ViIjoiMTYwOTE2MDAiLCJhdWQiOiJzdG9yZWZyb250IiwiY29tLm9yYWNsZS5hdGcuY2xvdWQuY29tbWVyY2Uucm9sZXMiOm51bGwsIm9jY3MuYWRtaW4ucm9sZXMiOm51bGwsImlzcyI6Imh0dHBzOi8vYTE1NDk1NDdjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vIiwib2Njcy5hZG1pbi5sb2NhbGUiOiJlbl9VUyIsIm9jY3MuYWRtaW4udHoiOm51bGwsIm9jY3MuYWRtaW4udGVuYW50VHoiOiJBbWVyaWNhL1Nhb19QYXVsbyIsIm9jY3MuYWRtaW4ua2VlcEFsaXZlVVJMIjoiaHR0cHM6Ly9hMTU0OTU0N2MxdHN0LWFkbWluLm9jY2Eub2NzLm9yYWNsZWNsb3VkLmNvbS8iLCJvY2NzLmFkbWluLnRva2VuUmVmcmVzaFVSTCI6Imh0dHBzOi8vYTE1NDk1NDdjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NzdG9yZS92MS9zc29Ub2tlbnMvcmVmcmVzaCIsIm9jY3MuYWRtaW4udmVyc2lvbiI6IjIxLjIuMSIsIm9jY3MuYWRtaW4uYnVpbGQiOiJqZW5raW5zLUFzc2VtYmxlX0Nsb3VkX0NvbW1lcmNlX0VBUnNfLW1hc3Rlci05MSIsIm9jY3MuYWRtaW4uZW1haWwiOm51bGwsIm9jY3MuYWRtaW4ucHJvZmlsZUlkIjoiMTYwOTE2MDAiLCJvY2NzLmFnZW50Lm9ibyI6bnVsbCwib2Njcy5hZG1pbi5maXJzdE5hbWUiOm51bGwsIm9jY3MuYWRtaW4ubGFzdE5hbWUiOm51bGwsIm9jY3MuYWRtaW4ucHVuY2hvdXRVc2VyIjpmYWxzZSwic3ViX3R5cGUiOm51bGwsInNjb3BlIjpudWxsfQ==.REp3FTRJ0NTW114wsEtW+ORbS/QR/LChL5VIA8TqfhudwOTr4vtcEC1ioH4Qw7inSfMNvkMe08bb7FXRl0WGROA2OIzFrNAemary7yA4KzVAXi23t1eAlJmQB3rtDtA2OeeNtkyKNemb5zwnyVqNo2GQaeq+VLa4w9fc2hoDEbUy0uEFfnelARy36c3peVAC3uHEzJk4vfICpqKtcS8q4NIzbEL9qT81Ek6VAoRe0tW8D8GSjev3/JHeNUFedqwbXk5kZ+5J1tXT0lzTRhSyVJwj8FmMl+lbemE8oX/S08XFHrxZR4hu+qLL5hxHPj5C2KeGI20AHrJd/vP5xNiS6A=='