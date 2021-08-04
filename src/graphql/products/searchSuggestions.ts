import { gql } from '@apollo/client'

export const searchSuggestions = gql`
query SearchSuggestions($fullText:String!) {
    searchSuggestions(fullText:$fullText)
    @context(provider: "vtex.search-graphql") {
        searches {
          term,
          count
        }
    }
}
`
export const searchSuggestionsAndProductSearch = gql`
query SearchSuggestionsAndProductSearch(
    $fullText: String!
    $hideUnavailableItems: Boolean = true
    $orderBy: String = "OrderByReviewRateDESC"
    $to: Int = 10
    $simulationBehavior: SimulationBehavior = default
    $productOriginVtex: Boolean = false
    ) {
    searchSuggestions(fullText: $fullText)
    @context(provider: "vtex.search-graphql") {
      searches {
        term,
        count
      }
    }
    productSearch(
      fullText: $fullText,
      hideUnavailableItems: $hideUnavailableItems,
      orderBy: $orderBy, 
      to: $to,
      simulationBehavior: $simulationBehavior,
      productOriginVtex: $productOriginVtex
    )
    @context(provider: "vtex.search-graphql") {
        products {
            categoryTree {
            href
            }
            items(filter: FIRST_AVAILABLE){
                images{
                    imageUrl
                }
				itemId
                variations{
                    originalName
                    name
                    values
                }
                sellers{
                    sellerId
                    commertialOffer{
                        Tax
                        taxPercentage
                        AvailableQuantity
                        Price
                        PriceWithoutDiscount
                        discountHighlights {
                            name
                        }
                        Installments{
                            Value
                            TotalValuePlusInterestRate
                            NumberOfInstallments
                            
                        }
                    }
                }
            }
            productId
            productName
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
  }
`

export interface SearchSuggestionsVars {
    term: string;
    count: number;
    attributes?: Attributes[];
}

export interface Attributes {
    key: string;
    value: string;
    labelValue: String;
}

