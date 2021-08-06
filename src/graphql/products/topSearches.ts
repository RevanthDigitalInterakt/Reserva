import { gql } from '@apollo/client'

export const topSearches = gql`
query TopSearches {
    topSearches 
      @context(provider: "vtex.search-graphql") {
      searches {
         term,
         count
      }
   }
}
`
export interface TopSearches {
    term: string;
    count: number;
    attributes: null
}