import { gql } from "@apollo/client";
//#region Action Types

export enum AddressTypes {
  LOAD_ADDRESS_REQUEST = "@address/LOAD_ADDRESS_REQUEST",
  LOAD_ADDRESS_SUCCESS = "@address/LOAD_ADDRESS_SUCCESS",
  LOAD_ADDRESS_FAILURE = "@address/LOAD_ADDRESS_FAILURE",
  CREATE_ADDRESS_REQUEST = "@address/CREATE_ADDRESS_REQUEST",
  CREATE_ADDRESS_SUCCESS = "@address/CREATE_ADDRESS_SUCCESS",
  CREATE_ADDRESS_FAILURE = "@address/CREATE_ADDRESS_FAILURE",
  DELETE_ADDRESS_REQUEST = "@address/DELETE_ADDRESS_REQUEST",
  UPDATE_ADDRESS_REQUEST = "@address/UPDATE_ADDRESS_REQUEST",
  DEFAULT_ADDRESS_REQUEST = "@address/DEFAULT_ADDRESS_REQUEST",
  DELETE_DEFAULT_ADDRESS = "@address/DELETE_DEFAULT_ADDRESS",
}

//#endregion

//#region Data Types

export interface Address {
  addressType?: string;
  address: {
    isDefaultBillingAddress?: boolean;
    country?: string; //pais
    lastName?: any;
    types?: any[];
    address3?: string; //bairro
    city?: string; //cidade
    address2?: string; //numero
    prefix?: any;
    address1?: string; //rua
    postalCode?: string;
    jobTitle?: any;
    companyName?: any;
    county?: any;
    suffix?: any;
    firstName?: any;
    externalAddressId?: any;
    phoneNumber?: any;
    repositoryId?: string;
    faxNumber?: any;
    middleName?: any;
    state?: string;
    id?: string;
    alias?: string;
    ullAddress?: string;
    isDefaultShippingAddress?: boolean;
  };
}

//#region

//#region State Type

export interface AddressState {
  readonly data?: Address[];
  readonly defaultAddress?: Address | {};
  readonly loading: boolean;
  readonly error: boolean;
}

//#region

export type CategoryQuery = {
  id: number;
  href: string;
  slug: string;
  name: string;
  titleTag: string;
  hasChildren: boolean;
  metaTagDescription: string;
  children: [CategoryQuery];
  highlight?: boolean;
  opened?: boolean;
};

export const saveAddressMutation = gql`
  mutation SaveAddress($fields: AddressInput!) {
    saveAddress(address: $fields) {
      addressId
      userId
    }
  }
`;

export const categoriesQuery = gql`
  query Categories {
    categories @context(provider: "vtex.store-graphql") {
      id
      href
      slug
      name
      titleTag
      hasChildren
      metaTagDescription
      children {
        id
        href
        slug
        name
        titleTag
        hasChildren
        metaTagDescription
      }
    }
  }
`;
