import { CategoriesParserString } from '../categoriesParserString';

describe('CategoriesParserString', () => {
  test('should return a string with category names joined by commas', () => {
    const categories = {
      1: 'Category 1',
      2: 'Category 2',
      3: 'Category 3',
    };

    const result = CategoriesParserString(categories);

    expect(result).toEqual('Category 1,Category 2,Category 3');
  });

  test('should return an empty string if categories object is empty', () => {
    const categories = {};

    const result = CategoriesParserString(categories);

    expect(result).toEqual('');
  });
});
