import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api";
import { profileLoad } from "../profile/actions";
import { loginSuccess, loginFailure } from "./actions";
import { AuthenticationTypes } from "./types";

interface ILoginPayload {
  username: string;
  password: string;
}

export function* loginReqest({ payload }: any) {
  try {
    const { loginCredentials } = payload;

    const { data } = yield call(api.post, "/login", loginCredentials);

    yield put(loginSuccess(data));
    yield put(profileLoad());
  } catch (err) {
    yield put(loginFailure());
  }
}

export function* login() {
  yield takeLatest(AuthenticationTypes.LOGIN_REQUEST, loginReqest);
}
