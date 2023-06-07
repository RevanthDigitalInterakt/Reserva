import { slugify } from '../slugify';

describe('slugify', () => {
  it('should convert a string to a slug', () => {
    const input = 'Hello World!';
    const expected = 'hello-world';
    const result = slugify(input);
    expect(result).toEqual(expected);
  });

  it('should handle special characters and diacritics in a string', () => {
    const input = 'Déjà Vu!';
    const expected = 'deja-vu';
    const result = slugify(input);
    expect(result).toEqual(expected);
  });

  it('should replace multiple spaces with a single hyphen', () => {
    const input = '   multiple    spaces   ';
    const expected = 'multiple-spaces';
    const result = slugify(input);
    expect(result).toEqual(expected);
  });

  it('should remove any non-alphanumeric characters except spaces and hyphens', () => {
    const input = 'Some $pecial @#characters!';
    const expected = 'some-pecial-characters';
    const result = slugify(input);
    expect(result).toEqual(expected);
  });

  it('should handle an empty string', () => {
    const input = '';
    const expected = '';
    const result = slugify(input);
    expect(result).toEqual(expected);
  });

  it('should handle a string with only spaces', () => {
    const input = '      ';
    const expected = '';
    const result = slugify(input);
    expect(result).toEqual(expected);
  });
});
