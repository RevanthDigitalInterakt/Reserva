import { cpfMask } from '../cpfMask';

describe('CPF mask validator', () => {
  it('should return empty string when non number', () => {
    const cpf = 'ABCDEFGHIJKLMN';

    expect(cpfMask(cpf)).toBe('');
  });

  it('should return empty string when more than 14 digits', () => {
    const cpf = '0000000000000000000000';
    expect(cpfMask(cpf)).toBe('');
  });

  it('should apply cpf mask', () => {
    const cpf = '00000000000';

    expect(cpfMask(cpf)).toBe('000.000.000-00');
  });
});
