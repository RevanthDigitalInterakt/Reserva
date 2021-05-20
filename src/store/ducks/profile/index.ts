import { Reducer } from "redux";
import { Profile, ProfileState, ProfileTypes } from "./types";

const INITIAL_STATE: ProfileState = {
  data: {} as Profile,
  error: false,
  loading: false,
};

const reducer: Reducer<ProfileState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileTypes.REGISTER:
      return { 
        ...state, 
        loading: true,
        payload: action.payload.data
      };
    case ProfileTypes.PROFILE_UPDATE: 
      return {
        ...state,
        loading: true,
        payload: action.payload.data
      }
    case ProfileTypes.PROFILE_LOAD: 
      return {
        ...state,
        loading: true
      }
    case ProfileTypes.REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case ProfileTypes.REQUEST_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return { ...state };
  }
};

export default reducer;