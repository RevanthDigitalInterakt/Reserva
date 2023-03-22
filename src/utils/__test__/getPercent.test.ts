import { getPercent } from '../getPercent';

describe('getPercent test', () => {
  it('should return undefined when sellingPrice is greater than listPrice', () => {
    const result = getPercent(100, 50);
    expect(result).toBeUndefined();
  });

  it('should return correct value when sellingPrice is equal to listPrice', () => {
    const result = getPercent(100, 100);
    expect(result).toBeUndefined();
  });

  it('should return correct value when sellingPrice is less than listPrice', () => {
    const result = getPercent(50, 100);
    expect(result).toEqual(50);
  });
});
