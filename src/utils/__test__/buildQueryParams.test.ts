import { buildQueryParams } from '../buildQueryParams';

describe('buildQueryParams', () => {
  it('should build a query string from parameters', () => {
    const params = { name: 'John', age: '30' };
    const result = buildQueryParams(params);
    expect(result).toBe('name=john&age=30');
  });

  it('should return an empty string for an empty object', () => {
    const params = {};
    const result = buildQueryParams(params);
    expect(result).toBe('');
  });

  it('should encode special characters in keys and values', () => {
    const params = { name: 'Jo&hn', age: '30', address: 'test mock teste address' };
    const result = buildQueryParams(params);
    expect(result).toBe('name=john&age=30&address=test-mock-teste-address');
  });

  it('should handle numeric values correctly', () => {
    const params = { count: 123, price: 19.99 };
    const result = buildQueryParams(params);
    expect(result).toBe('count=123&price=1999');
  });

  it('should handle boolean values correctly', () => {
    const params = { isActive: true, isAdmin: false };
    const result = buildQueryParams(params);
    expect(result).toBe('isactive=true&isadmin=false');
  });

  it('should handle null and undefined values correctly', () => {
    const params = { name: 'John', age: null, gender: undefined };
    const result = buildQueryParams(params);
    expect(result).toBe('name=john&age=null&gender=undefined');
  });

  it('should handle arrays correctly', () => {
    const params = { items: ['item1', 'item2', 'item3'] };
    const result = buildQueryParams(params);
    expect(result).toBe('items=item1&items=item2&items=item3');
  });

  it('should encode non-ASCII characters correctly', () => {
    const params = { name: 'Jöhn', city: 'München' };
    const result = buildQueryParams(params);
    expect(result).toBe('name=john&city=munchen');
  });

  it('should handle empty string values correctly', () => {
    const params = { name: '', age: '30' };
    const result = buildQueryParams(params);
    expect(result).toBe('name=&age=30');
  });

  it('should handle nested objects correctly', () => {
    const params = { details: { address: '123 Main St', city: 'Anytown' } };
    const result = buildQueryParams(params);
    expect(result).toBe('details-address=123-main-st&details-city=anytown');
  });

  it('should handle nested objects correctly case 2', () => {
    const params = { details: { address: { street: 'Main St', number: 123 }, city: 'Anytown' } };
    const result = buildQueryParams(params);
    expect(result).toBe('details-address-street=main-st&details-address-number=123&details-city=anytown');
  });
});
