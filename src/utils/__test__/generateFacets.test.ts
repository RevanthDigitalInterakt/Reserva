import { generateFacets } from '../generateFacets';

describe('generateFacets', () => {
  it('should return empty array when no params are passed', () => {
    const result = generateFacets({});
    expect(result).toEqual([]);
  });
  it('should return correct value when reference is passed', () => {
    const result = generateFacets({ reference: 'category:1|2|3' });
    expect(result).toEqual([
      { key: 'c', value: '1' },
      { key: 'c', value: '2' },
      { key: 'c', value: '3' },
    ]);
  });
  it('should return correct value when categories is passed', () => {
    const result = generateFacets({ categories: ['category:1|2|3', 'productClusterIds:4|5|6'] });
    expect(result).toEqual([
      { key: 'c', value: '1' },
      { key: 'c', value: '2' },
      { key: 'c', value: '3' },
      { key: 'productClusterIds', value: '4|5|6' },
    ]);
  });
  it('should return correct value when priceFilter is passed', () => {
    const result = generateFacets({ priceFilter: { from: 10, to: 20 } });
    expect(result).toEqual([{ key: 'priceRange', value: '10 TO 20' }]);
  });

  it('should return correct value when all params are passed', () => {
    const result = generateFacets({
      reference: 'category:1|2|3',
      categories: ['category:1|2|3', 'productClusterIds:4|5|6'],
      priceFilter: { from: 10, to: 20 },
    });
    expect(result).toEqual([
      { key: 'c', value: '1' },
      { key: 'c', value: '2' },
      { key: 'c', value: '3' },
      { key: 'productClusterIds', value: '4|5|6' },
      { key: 'priceRange', value: '10 TO 20' },
    ]);
  });
  it('should return correct value when empty categories are passed', () => {
    const result = generateFacets({
      reference: 'category:1|2|3',
      categories: [],
      priceFilter: { from: 10, to: 20 },
    });
    expect(result).toEqual([
      { key: 'c', value: '1' },
      { key: 'c', value: '2' },
      { key: 'c', value: '3' },
      { key: 'priceRange', value: '10 TO 20' },
    ]);
  });
});
