import formatString from '../formatString';

describe('Address test', () => {
  it('should format address', () => {
    const res = formatString.address({
      street: 'Rua Rego Freitas',
      number: '34',
      complement: 'AP88',
      neighborhood: 'República',
      city: 'São Paulo',
      state: 'SP',
    });

    expect(res).toBe('Rua Rego Freitas, 34, AP88, República, São Paulo - SP');
  });
});
