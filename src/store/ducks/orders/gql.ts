import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query {
    orders @context(provider: "vtex.store-graphql") {
      orderId
      state
      status
      statusDescription
      creationDate
      isCompleted
      items {
        id
        name
        skuName
        price
        listPrice
        sellingPrice
      }
    }
  }
`;
