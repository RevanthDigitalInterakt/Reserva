import { Reducer } from "redux";
import { AuthenticationState, AuthenticationTypes } from "./types";

const INITIAL_STATE: AuthenticationState = {
  data: [],
  error: false,
  loading: false,
};

const reducer: Reducer<AuthenticationState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AuthenticationTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        payload: action.payload.data,
      };
    case AuthenticationTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case AuthenticationTypes.LOGIN_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return { ...state };
  }
};

export default reducer;
