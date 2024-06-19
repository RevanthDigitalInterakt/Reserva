import { buildQueryParams } from '../buildQueryParams';

describe('buildQueryParams', () => {
  it('should build a query string from parameters', () => {
    const params = { name: 'John', age: '30' };
    const result = buildQueryParams(params);
    expect(result).toBe('name=John&age=30');
  });

  it('should return an empty string for an empty object', () => {
    const params = {};
    const result = buildQueryParams(params);
    expect(result).toBe('');
  });

  it('should encode special characters in keys and values', () => {
    const params = { name: 'Jo&hn', age: '30', address: 'test mock teste address' };
    const result = buildQueryParams(params);
    expect(result).toBe('name=John&age=30&address=test_mock_teste_address');
  });
});
