import { gql } from '@apollo/client';

export const GET_WISH_LIST = gql`
  query ViewList($shopperId: String!) {
    viewList(shopperId: $shopperId, name: "wishlist")
      @context(provider: "vtex.wish-list") {
      data {
        id
        productId
        sku
        title
      }
    }
  }
`;
