import { action } from "typesafe-actions";
import { Profile, ProfileTypes } from "./types";

export const registerRequest = (profileCredentials: Profile) =>
  action(ProfileTypes.REGISTER_REQUEST, { profileCredentials });

export const profileUpdate = (profileCredentials: Profile) =>
  action(ProfileTypes.PROFILE_UPDATE, { profileCredentials });

export const profileLoad = () => action(ProfileTypes.PROFILE_LOAD);

export const profileDelete = () => action(ProfileTypes.PROFILE_DELETE);

export const requestSuccess = (data: Profile) =>
  action(ProfileTypes.REQUEST_SUCCESS, { data });
export const requestFailure = () => action(ProfileTypes.REQUEST_FAILURE);
