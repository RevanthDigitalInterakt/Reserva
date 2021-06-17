export enum CashbackTypes {
  ADD_CASHBACK = '@cashback/ADD_CASHBACK',
  SUB_CASHBACK = '@cashback/SUB_CASHBACK',
  SET_CASHBACK = '@cashback/SET_CASHBACK',
}

export interface CashbackState {
  readonly value: number
}
