import { action } from 'typesafe-actions'
import { CashbackTypes } from './types'

export const addCashback = (num: number) =>
  action(CashbackTypes.ADD_CASHBACK, { num })

export const subCashback = (num: number) =>
  action(CashbackTypes.SUB_CASHBACK, { num })

export const setCashback = (num: number) =>
  action(CashbackTypes.SET_CASHBACK, { num })
