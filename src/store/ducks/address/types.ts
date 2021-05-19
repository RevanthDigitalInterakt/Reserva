//#region Action Types

export enum AddressTypes {
  LOAD_ADDRESS_REQUEST = '@address/LOAD_ADDRESS_REQUEST',
  LOAD_ADDRESS_SUCCESS = '@address/LOAD_ADDRESS_SUCCESS',
  LOAD_ADDRESS_FAILURE = '@address/LOAD_ADDRESS_FAILURE',
}

//#endregion

//#region Data Types

export interface Address {
  isDefaultBillingAddress?: boolean;
  country?: string; //pais
  address3: string; //bairro
  address2: string; //numero
  city: string;  //cidade
  address1: string; //rua
  postalCode: string; //CEP
  state: string; //EStado
  alias: string; //complemento
  fullAddress?: string; //endereco completo
  isDefaultShippingAddress?: boolean;
}

//#region

//#region State Type

export interface AddressState {
  readonly data: Address[];
  readonly loading: boolean;
  readonly error: boolean;
}

//#region
