import { gql } from "@apollo/client";

export const facetsQuery = gql`
  query Facets(
    $selectedFacets: [SelectedFacetInput],
    $hideUnavailableItems: Boolean = true
    ){
    facets(
      hideUnavailableItems: $hideUnavailableItems,
      selectedFacets: $selectedFacets
    ) @context(provider: "vtex.search-graphql"){
      queryArgs {
        selectedFacets{
          key
          value
        }
      }
      facets {
        name
        values {
          id
          name
          value
          range{
            from
            to
          }
          key
          quantity
        }
      }
    }
  }
`;