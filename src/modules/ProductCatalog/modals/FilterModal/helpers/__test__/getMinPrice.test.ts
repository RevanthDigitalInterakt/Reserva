import { getMinPrice } from '../getMinPrice';

describe('getMinPrice', () => {
  it('should return 0 when no params are passed', () => {
    const result = getMinPrice();
    expect(result).toEqual(0);
  });
  it('should return 0 when empty array is passed', () => {
    const result = getMinPrice([]);
    expect(result).toEqual(0);
  });
  it('should return correct value when array with one item is passed', () => {
    const result = getMinPrice([{ range: { from: 10, to: 20 } }]);
    expect(result).toEqual(10);
  });
  it('should return correct value when array with multiple items is passed', () => {
    const result = getMinPrice([{ range: { from: 10, to: 20 } }, { range: { from: 5, to: 15 } }]);
    expect(result).toEqual(5);
  });
});
