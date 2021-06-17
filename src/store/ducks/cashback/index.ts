import { Reducer } from 'redux'
import { CashbackState, CashbackTypes } from './types'

const INITIAL_STATE: CashbackState = {
  value: 0,
}

const reducer: Reducer<CashbackState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CashbackTypes.ADD_CASHBACK:
      console.log(action, state)
      return {
        ...state,
        value:
          state.value + action.payload.num > 0
            ? state.value + action.payload.num
            : 0,
      }
    case CashbackTypes.SUB_CASHBACK:
      return {
        ...state,
        value:
          state.value - action.payload.num > 0
            ? state.value - action.payload.num
            : 0,
      }
    case CashbackTypes.SET_CASHBACK:
      return {
        ...state,
        value: action.payload.num >= 0 ? action.payload.num : 0,
      }

    default:
      return state
  }
}

export default reducer
