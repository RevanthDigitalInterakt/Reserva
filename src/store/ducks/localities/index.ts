import { Reducer } from 'redux';
import { LocalitiesState, LocalitiesTypes } from './types';

const INITIAL_STATE: LocalitiesState = {
    data: [],
    error: false,
    loading: false
}

const reducer: Reducer<LocalitiesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LocalitiesTypes.LOAD_LOCALITY_REQUEST:
            return { ...state, loading: true }
        case LocalitiesTypes.LOAD_LOCALITY_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case LocalitiesTypes.LOAD_LOCALITY_FAILURE:
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default reducer;