import { call, put, select, takeLatest } from "redux-saga/effects";
import { ApplicationState } from "../..";
import {
  api,
  removeAuthorizationToken,
  setAuthorizationToken,
} from "../../../services/api";
import { profileDelete, profileLoad } from "../profile/actions";
import { loginSuccess, loginFailure, logoutSucess } from "./actions";

interface ILoginPayload {
  username: string;
  password: string;
}

export function* restoreSessionToken({ payload }: any) {
  try {
    const { authentication }: ApplicationState = yield select(
      (state: ApplicationState) => state
    );

    if (authentication.data?.access_token) {
      setAuthorizationToken(authentication.data?.access_token);
    }
  } catch (err) {}
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
