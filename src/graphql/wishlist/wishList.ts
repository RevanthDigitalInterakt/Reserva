import { gql } from '@apollo/client';

const ADD_WISH_LIST = gql`
  mutation AddToList($productId: String!, $shopperId: String!, $sku: String) {
    addToList(
      listItem: { productId: $productId, sku: $sku }
      shopperId: $shopperId
      name: "wishlist"
    ) @context(provider: "vtex.wish-list")
  }
`;

const CHECK_LIST = gql`
  query CheckList($shopperId: String!, $productId: String!, $sku: String) {
    checkList(shopperId: $shopperId, productId: $productId, sku: $sku) @context(provider: "vtex.wish-list") {
      inList
      listNames
      listIds
      message
    }
  }
`;

const GET_PRODUCT_BY_IDENTIFIER = gql`
  query ProductByIdentifier($idArray: [ID!]) {
    productsByIdentifier(field: sku, values: $idArray)
      @context(provider: "vtex.search-graphql") {
      productId
      productName
      description
      priceRange {
        sellingPrice {
          highPrice
          lowPrice
        }
        listPrice {
          highPrice
          lowPrice
        }
      }
      items {
        name
        itemId
        images {
          imageUrl
        }
        variations {
          originalName
          name
          values
        }
        sellers {
          sellerId
          commertialOffer {
            Tax
            taxPercentage
            AvailableQuantity
            Price
            ListPrice
            spotPrice
            PriceWithoutDiscount
            discountHighlights {
              name
            }
            Installments {
              Value
              TotalValuePlusInterestRate
              NumberOfInstallments
            }
          }
        }
      }
    }
  }
`;

export default {
  ADD_WISH_LIST,
  CHECK_LIST,
  GET_PRODUCT_BY_IDENTIFIER,
};
