import { stringToReal } from '../stringToReal';

describe('stringToReal test', () => {
  it('should return formatted number', () => {
    const result = stringToReal('123');
    expect(result).toEqual('R$ 1,23');
  });
  describe('When is null', () => {
    it('should not return empty string', () => {
      const result = stringToReal(null);
      expect(result).toEqual('');
    });
  });

  describe('When is undefined', () => {
    it('should not return empty string', () => {
      const result = stringToReal(undefined);
      expect(result).toEqual('');
    });
  });
  describe('When is string character', () => {
    it('should not return empty string', () => {
      const result = stringToReal('test');
      expect(result).toEqual('');
    });
  });
  describe('When is string character and number', () => {
    it('should not return empty string', () => {
      const result = stringToReal('test123');
      expect(result).toEqual('');
    });
  });
  describe('When is empty string with space', () => {
    it('should not return empty string', () => {
      const result = stringToReal('  ');
      expect(result).toEqual('');
    });
  });
  describe('When is number with space', () => {
    it('should not return formatted', () => {
      const result = stringToReal(' 1 ');
      expect(result).toEqual('R$ 0,10');
    });
  });
});
