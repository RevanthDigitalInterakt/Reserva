import { gql } from '@apollo/client';

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
