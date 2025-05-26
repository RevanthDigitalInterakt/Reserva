import isValidCPF from '../CPFValidator';

describe('CPFValidator test', () => {
  it('should invalidate some invalid documents', () => {
    const items = [
      '000.000.000-00',
      '111.111.111-11',
      '333.333.333-33',
      '666.666.666-66',
      '888.888.888-88',
      '999.999.999-99',
      '431.409.828-70',
      '',
      'teste',
    ];

    items.map((doc) => {
      expect(isValidCPF(doc)).toBeFalsy();
      return doc;
    });
  });

  it('should validate some valid documents', () => {
    const items = [
      '832.422.750-47',
      '414.763.510-58',
      '833.219.060-66',
      '15143043093',
      '40878725059',
      '15810647057',
      '63512999000',
    ];

    items.map((doc) => {
      expect(isValidCPF(doc)).toBeTruthy();
      return doc;
    });
  });
});
