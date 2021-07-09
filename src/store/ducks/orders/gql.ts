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
      value
      shippingData {
        logisticsInfo {
          selectedSla
          slas {
            name
            shippingEstimate
            shippingEstimateDate
          }
        }
        address {
          postalCode
          city
          state
          street
          country
          number
          neighborhood
          complement
        }
      }
      paymentData {
        transactions {
          isActive
          merchantName
          payments {
            firstDigits
            paymentSystem
            paymentSystemName
            installments
            value
          }
        }
      }
      totals {
        id
        name
        value
      }
      items {
        id
        name
        skuName
        price
        listPrice
        sellingPrice
        quantity
        imageUrl
      }
    }
  }
`;
