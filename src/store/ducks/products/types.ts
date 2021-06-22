//#region Action Types

import { gql } from '@apollo/client';

import { Product } from '../product/types'

export enum ProductsTypes {
  LOAD_PRODUCTS_CLEAN = '@products/LOAD_PRODUCTS_CLEAN',
  LOAD_PRODUCTS_REQUEST = '@products/LOAD_PRODUCTS_REQUEST',
  LOAD_PRODUCTS_SUCCESS = '@products/LOAD_PRODUCTS_SUCCESS',
  LOAD_PRODUCTS_FAILURE = '@products/LOAD_PRODUCTS_FAILURE',
}

export interface ProductsState {
  readonly dataOffer: Product[]
  readonly loading: boolean
  readonly error: boolean
}

export const productSearchQuery = gql`
  query ProductSearch($query: String!){
    productSearch(
      query: $query, 
      map:"c", 
      hideUnavailableItems: true
    ) 
    @context(provider: "vtex.search-graphql") {
      products {
        productName
        productId
      }
      recordsFiltered
      breadcrumb {
        name
        href
      }
    } 
  }
`;