import {
  getAFContentId,
  getAFContentType,
  getQuantity,
  getAFContent,
  getAFQuantity,
  sumQuantity,
} from '../checkoutInitiatedEvents';

describe('getAFContentId', () => {
  test('should return an array of product IDs', () => {
    const items = [
      { productId: 1 },
      { productId: 2 },
      { productId: 3 },
    ];

    const result = getAFContentId(items);

    expect(result).toEqual([1, 2, 3]);
  });

  test('should return an empty array if items is empty', () => {
    const items = [];

    const result = getAFContentId(items);

    expect(result).toEqual([]);
  });
});

describe('getAFContentType', () => {
  test('should return an array of category strings', () => {
    const items = [
      { productCategories: { 1: 'Category 1' } },
      { productCategories: { 2: 'Category 2' } },
      { productCategories: { 3: 'Category 3' } },
    ];

    const result = getAFContentType(items);

    expect(result).toEqual(['Category 1', 'Category 2', 'Category 3']);
  });

  test('should return an empty array if items is empty', () => {
    const items = [];

    const result = getAFContentType(items);

    expect(result).toEqual([]);
  });
});

describe('getQuantity', () => {
  test('should return an array of items with quantities summed up', () => {
    const items = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
      { productId: 1, quantity: 1 },
    ];

    const result = getQuantity(items);

    expect(result).toEqual([
      { productId: 1, quantity: 3 },
      { productId: 2, quantity: 3 },
    ]);
  });

  test('should return an empty array if items is empty', () => {
    const items = [];

    const result = getQuantity(items);

    expect(result).toEqual([]);
  });
});

describe('getAFContent', () => {
  test('should return an array of AFContent objects', () => {
    const items = [
      { productId: 1, price: 100, quantity: 2 },
      { productId: 2, price: 200, quantity: 1 },
    ];

    const result = getAFContent(items);

    expect(result).toEqual([
      { id: 1, price: 1, quantity: 2 },
      { id: 2, price: 2, quantity: 1 },
    ]);
  });

  test('should return an empty array if items is empty', () => {
    const items = [];

    const result = getAFContent(items);

    expect(result).toEqual([]);
  });
});

describe('getAFQuantity', () => {
  test('should return a stringified array of AFQuantity objects', () => {
    const items = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];

    const result = getAFQuantity(items);

    expect(result).toEqual(JSON.stringify([
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ]));
  });

  test('should return an empty array if items is empty', () => {
    const items = [];

    const result = getAFQuantity(items);

    expect(result).toEqual('[]');
  });
});

describe('sumQuantity', () => {
  test('should return the sum of quantities', () => {
    const items = [
      { quantity: 2 },
      { quantity: 3 },
      { quantity: 1 },
    ];

    const result = sumQuantity(items);

    expect(result).toEqual(6);
  });

  test('should return 0 if items is empty', () => {
    const items = [];

    const result = sumQuantity(items);

    expect(result).toEqual(0);
  });
});
