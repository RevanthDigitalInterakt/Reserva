import { call, put } from 'redux-saga/effects';
import { api } from '../../../services/api';
import { loginSuccess, loginFailure } from './actions';

interface ILoginPayload {
  username: string;
  password: string;
}

export function* login({ payload }: any) {

  const { loginCredentials } = payload;
  
  try {
    const { data } = yield call(
      api.post,
      '/login',
      loginCredentials
    );

    console.log(data);

    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginFailure());
  }
}
