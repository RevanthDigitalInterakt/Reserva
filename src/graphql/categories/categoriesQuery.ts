//#region Action Types

import { gql } from "@apollo/client";

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
  mkt?: boolean
}

export const categoriesQuery = gql`
  query {
    appMenuCollection(limit: 1) {
      items {
        itemsCollection(limit: 100) {
          items {
            mkt
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