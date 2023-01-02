import { gql } from '@apollo/client';

export const ordersQuery = gql`
  query Orders {
    orders {
      orderId
      shippingData {
        logisticsInfo {
          itemIndex
          selectedSla
          slas {
            shippingEstimate
            shippingEstimateDate
          }
        }
        address {
          street
          number
          neighborhood
          city
          state
          postalCode
        }
      }
      status
      value
      totals {
        id
        name
        value
      }
      items {
        id
        name
      }
    }
  }
`;

export const orderQuery = gql`
  query Order($orderId: String!) {
    order(id: $orderId)
    @context(provider: "vtex.store-graphql")
    {
      orderId
      status
      statusDescription
      shippingData{
        logisticsInfo{
          itemIndex
          selectedSla
          slas{
            shippingEstimate
            shippingEstimateDate
          }
        }
        address{
          street
          number
          neighborhood
          city
          state
          postalCode
        }
      }
      items{
        name
        price
        sellingPrice
        quantity
        imageUrl
        measurementUnit
      }
      value
      totals{
        id
        name
        value
      }
      paymentData{
        transactions{
          isActive
          merchantName
          payments{
            paymentSystemName
            paymentSystem
            lastDigits
          }
        }
      }
    }
  }
`;
