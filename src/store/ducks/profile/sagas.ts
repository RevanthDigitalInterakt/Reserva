import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../services/api";
import { requestSuccess, requestFailure } from "./actions";
import { Profile, ProfileTypes } from "./types";

export function* register({ payload }: any) {
  const { profileCredentials } = payload;

  try {
    const { data } = yield call(api.post, "/profiles", profileCredentials);

    yield put(requestSuccess(data));
  } catch (err) {
    yield put(requestFailure());
  }
}

export function* profileLoad() {
  try {
    const { data } = yield call(api.get, "/profiles/current");

    const profile: Profile = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      receiveEmail: data.receiveEmail,
      gender: data.gender,
      fullName: `${data.firstName} ${data.lastName}`,
      rsvCPF: data.dynamicProperties.filter((f) => f.id === "rsvCPF")[0][
        "value"
      ],
      rsvBirthDate: data.dynamicProperties.filter(
        (f) => f.id === "rsvBirthDate"
      )[0]["value"],
      rsvPhoneNumber: data.dynamicProperties.filter(
        (f) => f.id === "rsvPhoneNumber"
      )[0]["value"],
    };

    yield put(requestSuccess(profile));
  } catch (err) {
    yield put(requestFailure());
  }
}

export function* profileUpdate({ payload }: any) {
  const { profileCredentials } = payload;

  try {
    const { data } = yield call(api.put, "/profiles", profileCredentials);

    yield put(requestSuccess(data));
  } catch (err) {
    yield put(requestFailure());
  }
}
