import { gql } from '@apollo/client';

export interface ListContent {
  __typename: string;
  contentJSON: string;
}

export interface IListContentQuery {
  listContent: ListContent[]
}

export const listContentQuery = gql`
  query ListContent($blockId: String, $id: String, $template: String, $treePath: String) {
    listContent(
    blockId: $blockId
    pageContext: {
        id: $id
        type: "route"
    }
    template: $template
    treePath: $treePath
  ) {
      contentJSON
    }
  }
`;

export const facetsQuery = gql`
  query Facets(
    $selectedFacets: [SelectedFacetInput]
    $hideUnavailableItems: Boolean = true
  ) {
    facets(
      hideUnavailableItems: $hideUnavailableItems
      selectedFacets: $selectedFacets
    ) @context(provider: "vtex.search-graphql") {
      queryArgs {
        selectedFacets {
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
          range {
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
