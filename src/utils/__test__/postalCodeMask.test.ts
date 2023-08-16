import { postalCodeMask } from '../postalCodeMask';

describe('postal code mask validator', () => {
  it('should return empty string when non number', () => {
    const postalCode = 'ABCDEFGHIJKLMN';

    expect(postalCodeMask(postalCode)).toBe('');
  });

  it('should return empty string when more than 8 digits', () => {
    const postalCode = '000000000';

    expect(postalCodeMask(postalCode)).toBe('');
  });

  it('should apply postal code mask', () => {
    const postalCode = '00000000';

    expect(postalCodeMask(postalCode)).toBe('00000-000');
  });
});
