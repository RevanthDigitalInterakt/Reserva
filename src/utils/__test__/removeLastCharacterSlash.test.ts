import { removeLastCharacterSlash } from '../removeLastCharacterSlash';

describe('removeLastCharacterSlash test', () => {
  it('should remove last character', () => {
    const res = removeLastCharacterSlash('teste/');

    expect(res).toBe('teste');
  });

  it('should keep last character', () => {
    const res = removeLastCharacterSlash('teste/testando');

    expect(res).toBe('teste/testando');
  });
});
