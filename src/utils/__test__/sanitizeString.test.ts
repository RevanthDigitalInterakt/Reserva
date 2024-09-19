import { sanitizeString } from '../sanitizeString';

describe('sanitizeString', () => {
  test('should convert string to lowercase', () => {
    expect(sanitizeString('TEST')).toBe('test');
  });

  test('should replace accented characters', () => {
    expect(sanitizeString('àÀáÁâÂãäÄÅåª')).toBe('a');
    expect(sanitizeString('èÈéÉêÊëË')).toBe('e');
    expect(sanitizeString('ìÌíÍîÎïÏ')).toBe('i');
    expect(sanitizeString('òÒóÓôÔõÕöÖº')).toBe('o');
    expect(sanitizeString('ùÙúÚûÛüÜ')).toBe('u');
    expect(sanitizeString('ýÝÿŸ')).toBe('y');
    expect(sanitizeString('ñÑ')).toBe('n');
    expect(sanitizeString('çÇ')).toBe('c');
    expect(sanitizeString('ß')).toBe('ss');
    expect(sanitizeString('Ææ')).toBe('ae');
    expect(sanitizeString('Øøœ')).toBe('oe');
  });

  test('should replace % with pct', () => {
    expect(sanitizeString('100%')).toBe('100pct');
  });

  test('should replace spaces with -', () => {
    expect(sanitizeString('hello world')).toBe('hello-world');
  });

  test('should remove non-word characters', () => {
    expect(sanitizeString('hello@world!')).toBe('helloworld');
  });

  test('should replace multiple - with single -', () => {
    expect(sanitizeString('hello---world')).toBe('hello-world');
  });

  test('should trim - from start and end of text', () => {
    expect(sanitizeString('-hello-world-')).toBe('hello-world');
  });

  test('should handle complex string', () => {
    expect(sanitizeString(' Héllõ Wörld! 100% ')).toBe('hello-world-100pct');
  });

  test('should handle empty string', () => {
    expect(sanitizeString('')).toBe('');
  });

  test('should handle string with only special characters', () => {
    expect(sanitizeString('%%%')).toBe('pct');
  });

  test('should handle string with no changes needed', () => {
    expect(sanitizeString('simple-text')).toBe('simple-text');
  });
});
