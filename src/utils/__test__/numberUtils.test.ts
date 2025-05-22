import { integerPart, decimalPart } from '../numberUtils';

describe('integerPart', () => {
  test('should return the integer part of a positive number', () => {
    const num = 123.45;

    const result = integerPart(num);

    expect(result).toBe(123);
  });
});

describe('decimalPart', () => {
  test('should return the decimal part of a number with two decimal places', () => {
    const num = 123.45;

    const result = decimalPart(num);

    expect(result).toBe('45');
  });

  test('should return "00" for a number with no decimal places', () => {
    const num = 123;

    const result = decimalPart(num);

    expect(result).toBe('00');
  });
});
