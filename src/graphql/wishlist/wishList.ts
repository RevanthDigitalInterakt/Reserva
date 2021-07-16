import { gql } from "@apollo/client";

const GET_WISH_LIST = gql`
  query ViewList($shopperId: String!, $from: Int, $to: Int) {
    viewList(shopperId: $shopperId, name: "wishlist", from: $from, to: $to)
    @context(provider: "vtex.wish-list"){
      data {
        id,
        productId,
        sku,
        title,
      }
    }
}
`

const ADD_WISH_LIST = gql`
  mutation AddToList ($productId:String!, $shopperId:String!, $sku: String){
  addToList (listItem:{productId:$productId, sku: $sku}, shopperId: $shopperId, name: "wishlist")
  @context(provider: "vtex.wish-list")
}
`

const REMOVE_WISH_LIST = gql`
  mutation RemoveFromList ($id: ID!, $shopperId:String!){
    removeFromList (id: $id, shopperId: $shopperId, name: "wishlist")
    @context(provider: "vtex.wish-list")
  }
`

const CHECK_LIST = gql`
  query CheckList(
    $shopperId: String!
    $productId: String!
    $sku: String
  ){
    checkList(
      shopperId: $shopperId,
      productId: $productId,
      sku: $sku
    ){
      inList
      listNames
      listIds
      message
    }
  }
`

const GET_PRODUCT_BY_IDENTIFIER = gql`
query ProductByIdentifier($idArray: [ID!]){
    productsByIdentifier(field: id, values: $idArray)
    @context(provider: "vtex.search-graphql")
    {
      productId,
      productName,
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
      items{
        itemId,
        images{
          imageUrl,
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
    }
  }
`

export default { GET_WISH_LIST, ADD_WISH_LIST, CHECK_LIST, REMOVE_WISH_LIST, GET_PRODUCT_BY_IDENTIFIER }