//#region Action Types

import { gql } from "@apollo/client";

export enum CategoriesTypes {
  LOAD_REQUEST = '@categories/LOAD_REQUEST',
  LOAD_SUCCESS = '@categories/LOAD_SUCCESS',
  LOAD_FAILURE = '@categories/LOAD_FAILURE',
}

//#endregion

//#region Data Types

export interface Category {
  childs: Category[];
  link: string;
  linkRoute: string;
  name: string;
  route: string;
  style: string;
  type: string;
  highlight?: boolean;
  opened?: boolean;
}

//#region

//#region State Type

export interface CategoriesState {
  readonly data: Category[];
  readonly loading: boolean;
  readonly error: boolean;
}

//#region

export type CategoryQuery = {
  id: number;
  href: string;
  slug: string;
  name: string;
  titleTag: string;
  hasChildren: boolean;
  metaTagDescription: string;
  children: [CategoryQuery]
  highlight?: boolean;
  opened?: boolean;
}

export const categoriesQuery = gql`
  query {
    appMenuCollection(limit: 1) {
      items {
        itemsCollection(limit: 100) {
          items {
            name
            referenceId
            childCategoryCollection(limit: 100) {
              items {
                name
                referenceId
              }
            }
          }
        }
      }
    }
  }
`;