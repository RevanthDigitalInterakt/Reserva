import { action } from "typesafe-actions";
import { Authentication, AuthenticationTypes } from "./types";

export const login = (loginCredentials: any) =>
  action(AuthenticationTypes.LOGIN_REQUEST, {
    loginCredentials,
  });
export const loginSuccess = (data: Authentication[]) =>
  action(AuthenticationTypes.LOGIN_SUCCESS, { data });
export const loginFailure = () => action(AuthenticationTypes.LOGIN_FAILURE);
