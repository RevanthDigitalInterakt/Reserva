import { removeNonNumbers } from '../removeNonNumbers';

describe('removeNonNumbers', () => {
  it('should remove all non-numeric characters from a string', () => {
    const input = 'abc123def456ghi';
    const expected = '123456';
    const result = removeNonNumbers(input);
    expect(result).toEqual(expected);
  });

  it('should return an empty string if no argument is provided', () => {
    const result = removeNonNumbers();
    expect(result).toEqual('');
  });

  it('should return an empty string if the input consists only of non-numeric characters', () => {
    const input = 'abc!@#$%def';
    const result = removeNonNumbers(input);
    expect(result).toEqual('');
  });

  it('should preserve a string that consists only of numeric digits', () => {
    const input = '1234567890';
    const result = removeNonNumbers(input);
    expect(result).toEqual(input);
  });
});
