import { print } from 'graphql';
import { categoriesQuery } from '../categoriesQuery';

describe('categoriesQuery', () => {
  it('should have a valid GraphQL query', () => {
    const expectedQuery = `{
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

    expect(print(categoriesQuery)).toEqual(expectedQuery);
  });
});
