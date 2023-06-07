import { splitSellerName } from '../splitSellerName';

describe('splitSellerName', () => {
  it('should split the seller name and return the first name', () => {
    const sellerName = 'sellerName=John Doe';
    const expected = 'John';
    const result = splitSellerName(sellerName);
    expect(result).toEqual(expected);
  });

  it('should return an empty string if the seller name does not contain a first name', () => {
    const sellerName = 'sellerName=';
    const expected = '';
    const result = splitSellerName(sellerName);
    expect(result).toEqual(expected);
  });

  it('should return an empty string if the seller name is empty', () => {
    const sellerName = '';
    const expected = '';
    const result = splitSellerName(sellerName);
    expect(result).toEqual(expected);
  });
});
