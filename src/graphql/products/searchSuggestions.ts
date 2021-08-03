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
export interface SearchSuggestionsVars {
    term: string;
    count: number;
    attributes: null
}