//#region Action Types

export enum AddressTypes {
  LOAD_ADDRESS_REQUEST = '@address/LOAD_ADDRESS_REQUEST',
  LOAD_ADDRESS_SUCCESS = '@address/LOAD_ADDRESS_SUCCESS',
  LOAD_ADDRESS_FAILURE = '@address/LOAD_ADDRESS_FAILURE',
}

//#endregion

//#region Data Types

export interface Address {
  country: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  postalCode: string;
  state: string;
  alias: string;
  fullAddress: string;
}

//#region

//#region State Type

export interface AddressState {
  readonly data: Address[];
  readonly loading: boolean;
  readonly error: boolean;
}

//#region
