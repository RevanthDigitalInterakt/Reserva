import { getMaxPrice } from '../getMaxPrice';

describe('getMaxPrice', () => {
  it('should return 0 when no params are passed', () => {
    const result = getMaxPrice();
    expect(result).toEqual(0);
  });
  it('should return 0 when empty array is passed', () => {
    const result = getMaxPrice([]);
    expect(result).toEqual(0);
  });
  it('should return correct value when array with one item is passed', () => {
    const result = getMaxPrice([{ range: { from: 10, to: 20 } }]);
    expect(result).toEqual(20);
  });
  it('should return correct value when array with multiple items is passed', () => {
    const result = getMaxPrice([{ range: { from: 10, to: 20 } }, { range: { from: 5, to: 15 } }]);
    expect(result).toEqual(20);
  });
});
