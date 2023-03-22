import { generateFacets } from '../generateFacets';

describe('generateFacets test', () => {
  it('should return empty array when null or undefined are passed', () => {
    const result = generateFacets();
    expect(result).toEqual([]);
  });

  it('should return empty array when no params are passed', () => {
    const result = generateFacets({});
    expect(result).toEqual([]);
  });

  it('should return empty array when empty reference is passed', () => {
    const result = generateFacets({ reference: '' });
    expect(result).toEqual([]);
  });

  it('should return empty array when empty categories is passed', () => {
    const result = generateFacets({ categories: ['', ''] });
    expect(result).toEqual([]);
  });

  it('should return correct value when deeplink reference is passed', () => {
    const result = generateFacets({ reference: 'queryField=431,1484,1450,1438,1606,1692,1807,polos&mapField=productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,productClusterIds,category-3' });
    expect(result).toEqual([
      { key: 'productClusterIds', value: '431' },
      { key: 'productClusterIds', value: '1484' },
      { key: 'productClusterIds', value: '1450' },
      { key: 'productClusterIds', value: '1438' },
      { key: 'productClusterIds', value: '1606' },
      { key: 'productClusterIds', value: '1692' },
      { key: 'productClusterIds', value: '1807' },
      { key: 'category-3', value: 'polos' },
    ]);
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
