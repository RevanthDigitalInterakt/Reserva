import { handlePathsParams, splitPathParams } from '../linkingUtils';

describe('handlePathsParams', () => {
  it('should be return the original path if keyword is not found', () => {
    const result = handlePathsParams('/api/v1/users', 'products');
    expect(result).toBe('/api/v1/users');
  });

  it('should be return path with specified number of params after keyword', () => {
    const result = handlePathsParams('/api/v1/products/item1/item2', 'products', 2);
    expect(result).toBe('/api/v1/products/item1/item2');
  });

  it('should be append "null" if there are not enough params after keyword', () => {
    const result = handlePathsParams('/api/v1/products', 'products', 3);
    expect(result).toBe('/api/v1/products/null/null/null');
  });

  it('should be limit the number of params to the specified number', () => {
    const result = handlePathsParams('/api/v1/products/item1/item2/item3', 'products', 2);
    expect(result).toBe('/api/v1/products/item1/item2');
  });

  it('should be handle empty path gracefully', () => {
    const result = handlePathsParams('', 'products', 2);
    expect(result).toBe('');
  });
});

describe('splitPathParams', () => {
  it('should be return empty string if path is empty', () => {
    const result = splitPathParams('', 'products');
    expect(result).toBe('');
  });

  it('should be return empty string if keyword is empty', () => {
    const result = splitPathParams('/api/v1/products/item1', '');
    expect(result).toBe('');
  });

  it('should be return empty string if keyword is not found', () => {
    const result = splitPathParams('/api/v1/users/item1', 'products');
    expect(result).toBe('');
  });

  it('should be return the substring after the keyword', () => {
    const result = splitPathParams('/api/v1/products/item1/item2', 'products');
    expect(result).toBe('/item1/item2');
  });

  it('should be return empty string if keyword is at the end of the path', () => {
    const result = splitPathParams('/api/v1/products', 'products');
    expect(result).toBe('');
  });
});
