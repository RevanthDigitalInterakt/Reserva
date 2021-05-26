import { call, put, takeLatest } from "redux-saga/effects";
import {
  api,
  removeAuthorizationToken,
  setAuthorizationToken,
} from "../../../services/api";
import { profileDelete, profileLoad } from "../profile/actions";
import { loginSuccess, loginFailure, logoutSucess } from "./actions";
import { Authentication, AuthenticationTypes } from "./types";

interface ILoginPayload {
  username: string;
  password: string;
}

export function* loginReqest({ payload }: any) {
  try {
    const { loginCredentials } = payload;

    const { data } = yield call(api.post, "/login", loginCredentials);

    setAuthorizationToken(data.access_token);

    yield put(loginSuccess(data));
    yield put(profileLoad());
  } catch (err) {
    yield put(loginFailure());
  }
}

export function* logoutRequest({ payload }: any) {
  try {
    removeAuthorizationToken();
    yield put(logoutSucess());
    yield put(profileDelete());
  } catch (err) {
    yield put(loginFailure());
  }
}
