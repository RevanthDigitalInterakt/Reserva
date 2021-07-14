import { gql } from '@apollo/client';

export const updateAddress = gql`
  mutation updateAddress($id: String!, $fields: AddressInput) {
    updateAddress(id: $id, fields: $fields)
      @context(provider: "vtex.store-graphql") {
      userId
    }
  }
`;

export const deleteAddress = gql`
  mutation DeleteAddress($id: String) {
    deleteAddress(id: $id) @context(provider: "vtex.store-graphql") {
      userId
    }
  }
`;

export const saveAddressMutation = gql`
  mutation SaveAddress($fields: AddressInput!) {
    saveAddress(address: $fields) @context(provider: "vtex.store-graphql") {
      addressId
      userId
    }
  }
`;
