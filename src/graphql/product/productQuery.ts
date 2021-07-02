import { gql } from "@apollo/client";

export const productQuery = gql`
  query Product($id: ID!){
    product(
      identifier: {
        field: id, 
        value: $id
        }
    )
    @context(provider: "vtex.search-graphql")
    {
      productId
      productName
      
      items {
        images{
          imageUrl
        }
        itemId
        sellers {
          commertialOffer {
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