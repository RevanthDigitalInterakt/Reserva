import { getInitialFilterPriceValues } from '../getInitialFilterPriceValues';

describe('getInitialFilterPriceValues', () => {
  it('should return correct value when no params are passed', () => {
    const result = getInitialFilterPriceValues();
    expect(result).toEqual([0, 0]);
  });
  it('should return correct value when empty array is passed', () => {
    const result = getInitialFilterPriceValues([]);
    expect(result).toEqual([0, 0]);
  });
  it('should return correct value when array with one item is passed', () => {
    const result = getInitialFilterPriceValues([{ range: { from: 10, to: 20 } }]);
    expect(result).toEqual([10, 20]);
  });
  it('should return correct value when array with multiple items is passed', () => {
    const result = getInitialFilterPriceValues([
      { range: { from: 10, to: 20 } }, { range: { from: 5, to: 15 } }], [{
      key: 'priceRange',
      value: '2 TO 35',
    }]);
    expect(result).toEqual([5, 20]);
  });
  it('should return correct value when price range value is wrong', () => {
    const result = getInitialFilterPriceValues([
      { range: { from: 10, to: 20 } }, { range: { from: 5, to: 15 } }], [{
      key: 'priceRange',
      value: '2 batata 35',
    }]);
    expect(result).toEqual([5, 20]);
  });
  it('should return correct value when price range key is wrong', () => {
    const result = getInitialFilterPriceValues([
      { range: { from: 10, to: 20 } }, { range: { from: 5, to: 15 } }], [{
      key: 'c',
      value: 'teste',
    }]);
    expect(result).toEqual([5, 20]);
  });
});
