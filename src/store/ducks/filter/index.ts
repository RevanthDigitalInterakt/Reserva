import { Reducer } from "redux";
import { FilterState, FilterTypes } from "./types";

const INITIAL_STATE: FilterState = {
  data: null,
  error: false,
  loading: false,
};

const reducer: Reducer<FilterState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterTypes.LOAD_FILTER_SUCCESS:
      return {
        ...state,
        loading: true,
        data: { ...state.data, ...action.payload.data },
      };
    default:
      return state;
  }
};

export default reducer;
