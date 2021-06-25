import { gql } from "@apollo/client";

export interface AddressQueryList {
  addresses: {
    id: string;
    number: string;
    city: string;
    complement: string;
    postalCode: string;
    state: string;
    street: string;
    neighborhood: string;
  }[];
}

export const addressesQuery = gql`
query Addresses {
  profile @context(provider: "vtex.store-graphql") {
    addresses {
      id
      number
      city
      complement
      postalCode
      state
      street
      neighborhood
    }
  }
}
`;
