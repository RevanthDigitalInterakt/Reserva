  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var ADD_WISH_LIST = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
  mutation AddToList($productId: String!, $shopperId: String!, $sku: String) {
    addToList(
      listItem: { productId: $productId, sku: $sku }
      shopperId: $shopperId
      name: "wishlist"
    ) @context(provider: "vtex.wish-list")
  }
`;
  var CHECK_LIST = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
  query CheckList($shopperId: String!, $productId: String!, $sku: String) {
    checkList(shopperId: $shopperId, productId: $productId, sku: $sku) @context(provider: "vtex.wish-list") {
      inList
      listNames
      listIds
      message
    }
  }
`;
  var GET_PRODUCT_BY_IDENTIFIER = (0, _$$_REQUIRE(_dependencyMap[0]).gql)`
  query ProductByIdentifier($idArray: [ID!]) {
    productsByIdentifier(field: sku, values: $idArray)
      @context(provider: "vtex.search-graphql") {
      productId
      productName
      description
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
      items {
        name
        itemId
        images {
          imageUrl
        }
        variations {
          originalName
          name
          values
        }
        sellers {
          sellerId
          commertialOffer {
            Tax
            taxPercentage
            AvailableQuantity
            Price
            ListPrice
            spotPrice
            PriceWithoutDiscount
            discountHighlights {
              name
            }
            Installments {
              Value
              TotalValuePlusInterestRate
              NumberOfInstallments
            }
          }
        }
      }
    }
  }
`;
  var _default = exports.default = {
    ADD_WISH_LIST: ADD_WISH_LIST,
    CHECK_LIST: CHECK_LIST,
    GET_PRODUCT_BY_IDENTIFIER: GET_PRODUCT_BY_IDENTIFIER
  };
