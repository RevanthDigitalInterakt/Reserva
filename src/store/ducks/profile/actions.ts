import { action } from "typesafe-actions";
import { Profile, ProfileTypes } from "./types";

export const register = (profileCredentials: Profile) => 
  action(ProfileTypes.REGISTER, { profileCredentials });
export const profileUpdate = (profileCredentials: Profile) => 
  action(ProfileTypes.PROFILE_UPDATE, { profileCredentials });
export const profileLoad = () => action(ProfileTypes.PROFILE_LOAD);

export const requestSuccess = (data: Profile) => 
  action(ProfileTypes.REQUEST_SUCCESS, { data });
export const requestFailure = () => 
  action(ProfileTypes.REQUEST_FAILURE);