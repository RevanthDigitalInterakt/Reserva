import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Product($id: ID!) {
    product(identifier: { field: id, value: $id })
      @context(provider: "vtex.search-graphql") {
      productId
      productName
      description
      skuSpecifications {
        field {
          name
          originalName
        }
        values {
          name
          originalName
        }
      }
      clusterHighlights {
        id,
        name
      }
      items {
        variations {
          originalName
          name
          values
        }
        images {
          imageUrl
        }
        itemId
        sellers {
          sellerName
          sellerId
          sellerDefault
          commertialOffer {
            AvailableQuantity
            Price
            Tax
            taxPercentage
            discountHighlights {
              name
            }
            Installments {
              Value
              NumberOfInstallments
              PaymentSystemName
              PaymentSystemGroupName
              Name
            }
          }
        }
      }
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
    }
  }
`;

export const GET_SHIPPING = gql`
  query Shipping(
    $items: [ShippingItem],
    $postalCode: String
  ){
    shipping(
      items: $items,
      country: "BRA",
      postalCode: $postalCode
    )@context(provider: "vtex.store-graphql"){
      logisticsInfo{
        selectedSla
        slas{
          name
          friendlyName
          price
          shippingEstimate
        }
      }
    }
  }
`;