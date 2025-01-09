  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.listContentQuery = exports.facetsQuery = undefined;
  var listContentQuery = exports.listContentQuery = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
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
  var facetsQuery = exports.facetsQuery = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
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
