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
      description
      skuSpecifications{
        field{
          name
          originalName
        }
        values{
          name
          originalName
        }
      }
      items {
        variations{
          originalName
          name
          values
        }
        images{
          imageUrl
        }
        itemId
        sellers {
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