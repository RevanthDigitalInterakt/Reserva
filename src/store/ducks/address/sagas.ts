import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { apiCategories } from '../../../services/api';
import { loadAddressSuccess, loadAddressFailure } from './actions';

const api = axios.create({
  baseURL: 'https://reserva-gateway.gateway.linkapi.solutions/v1/'
});

api.defaults.headers.common['Authorization'] =
  'Basic YmY3ZWRlYTMtYmMwOS00OTUxLWIwZDMtYmI0MTI0MjUyNTdjOjkyZTA1MDQ0LTY0ODctNGMxNS05ZDMyLTRmZmQ0NmNkYTYyZA==';

api.defaults.headers.common['client-token'] =
  'eyJhbGciOiJSUzI1NiIsImprdSI6ImExNTQ5NTQ3YzFUU1QiLCJraWQiOiIyIiwieDVjIjpudWxsLCJ4NXUiOiJodHRwczovL2ExNTQ5NTQ3YzF0c3QtYWRtaW4ub2NjYS5vY3Mub3JhY2xlY2xvdWQuY29tL2Njc3RvcmUvdjEvdGVuYW50Q2VydENoYWluIn0=.eyJpYXQiOjE2MjE0NzA0NTcsImV4cCI6MTYyMTQ3MTM4Nywic3ViIjoiMTYwOTE2MDAiLCJhdWQiOiJzdG9yZWZyb250IiwiY29tLm9yYWNsZS5hdGcuY2xvdWQuY29tbWVyY2Uucm9sZXMiOm51bGwsIm9jY3MuYWRtaW4ucm9sZXMiOm51bGwsImlzcyI6Imh0dHBzOi8vYTE1NDk1NDdjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vIiwib2Njcy5hZG1pbi5sb2NhbGUiOiJlbl9VUyIsIm9jY3MuYWRtaW4udHoiOm51bGwsIm9jY3MuYWRtaW4udGVuYW50VHoiOiJBbWVyaWNhL1Nhb19QYXVsbyIsIm9jY3MuYWRtaW4ua2VlcEFsaXZlVVJMIjoiaHR0cHM6Ly9hMTU0OTU0N2MxdHN0LWFkbWluLm9jY2Eub2NzLm9yYWNsZWNsb3VkLmNvbS8iLCJvY2NzLmFkbWluLnRva2VuUmVmcmVzaFVSTCI6Imh0dHBzOi8vYTE1NDk1NDdjMXRzdC1hZG1pbi5vY2NhLm9jcy5vcmFjbGVjbG91ZC5jb20vY2NzdG9yZS92MS9zc29Ub2tlbnMvcmVmcmVzaCIsIm9jY3MuYWRtaW4udmVyc2lvbiI6IjIxLjIuMSIsIm9jY3MuYWRtaW4uYnVpbGQiOiJqZW5raW5zLUFzc2VtYmxlX0Nsb3VkX0NvbW1lcmNlX0VBUnNfLW1hc3Rlci05MSIsIm9jY3MuYWRtaW4uZW1haWwiOm51bGwsIm9jY3MuYWRtaW4ucHJvZmlsZUlkIjoiMTYwOTE2MDAiLCJvY2NzLmFnZW50Lm9ibyI6bnVsbCwib2Njcy5hZG1pbi5maXJzdE5hbWUiOm51bGwsIm9jY3MuYWRtaW4ubGFzdE5hbWUiOm51bGwsIm9jY3MuYWRtaW4ucHVuY2hvdXRVc2VyIjpmYWxzZSwic3ViX3R5cGUiOm51bGwsInNjb3BlIjpudWxsfQ==.V7M9zYRbLBKt6uo4UBvPN7/TYaUt3sRUd+GhvvUmNrtIXWpItuHi57Ty4qGkhrW0eArdH1GhQQoPpASlwsiqjP+Xg9W0FgpTEVPzcfzmZVQfKZ/tBk/BztMg7inBiggvwgm3+/yq6OBdTHxxmIm+433nREimemmRCz+pHjidS2GaDoTGFgrsxonq3b5tPNyK4Akg6qTKxff+oq3kycdRHU0svoogeOpQjdXxWW8o79gGNt6hhqTWrvhE4aGqNCTMHrTtwqI8B7KMox+PzaCv7+7Ti1begUHzETAUdAvPBwW448duokDo0r8RR/O1wecja4TCDIlzxEDEHSy3kKbz5A==';


export function* loadAddress({ ...action }) {
  try {
    const response = yield call(api.get, 'profiles/current/addresses');
    yield put(loadAddressSuccess(response.data?.items));
  } catch (err) {
    yield put(loadAddressFailure());
  }
}

export function* apiAddNewAddress() {
  try {
    const { response } = yield call(api.post, 'profiles/current/addresses', {

    });
    yield put(loadAddressSuccess(response.data));
  } catch (err) {
    yield put(loadAddressFailure());
  }
}

// export const apiAddNewAddress = async () => {
//   const response = await api.post('profiles/current/addresses', {
//     address: {
//       country: "BR",
//       address1: "RODOVIA DO SOL",
//       address2: "123|ASDASD",
//       address3: "VILLAGE DO SOL",
//       city: "GUARAPARI",
//       postalCode: "29226680",
//       state: "ES",
//       alias: "Principal",
//       fullAddress: "RODOVIA DO SOL 123|ASDASD VILLAGE DO SOL"
//     }
//   })
//   return response.data
// }

// try {
//   const response = yield call(fetch, Url, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//       'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded; charset=utf-8'
//     },
//     body: formData
//   })
//   if (response.ok) {
//     const jsonResponse = yield response.text()
//     yield put(LoginActions.loginSuccess(jsonResponse))
//   } else {
//     const jsonResponse = yield response.text();
//     yield put(LoginActions.loginFailure(jsonResponse))
//   }