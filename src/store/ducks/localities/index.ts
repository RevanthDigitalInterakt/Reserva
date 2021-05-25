import { Reducer } from 'redux';
import { LocalitiesState, LocalitiesTypes } from './types';

const INITIAL_STATE: LocalitiesState = {
    dataState: [],
    dataCounty: [],
    error: false,
    loading: false
}

const reducer: Reducer<LocalitiesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LocalitiesTypes.LOAD_STATES_REQUEST:
            return { ...state, loading: true }
        case LocalitiesTypes.LOAD_STATES_SUCCESS:
            return { ...state, loading: false, error: false, dataState: action.payload.data }
        case LocalitiesTypes.LOAD_STATES_FAILURE:
            return { ...state, loading: false, error: true }

        case LocalitiesTypes.LOAD_COUNTIES_REQUEST:
            return { ...state, loading: true, payload: action.payload.county }
        case LocalitiesTypes.LOAD_COUNTIES_SUCCESS:
            return { ...state, loading: false, error: false, dataCounty: action.payload.dataCounty }
        case LocalitiesTypes.LOAD_COUNTIES_FAILURE:
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default reducer;