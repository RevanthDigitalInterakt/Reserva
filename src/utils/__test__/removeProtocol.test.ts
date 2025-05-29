import { removeProtocol } from '../removeProtocol';

describe('removeProtocol', () => {
  it('should remove the protocol from an HTTP URL', () => {
    const url = 'http://www.example.com';
    const expected = 'www.example.com';
    const result = removeProtocol(url);
    expect(result).toEqual(expected);
  });

  it('should remove the protocol from an HTTPS URL', () => {
    const url = 'https://www.example.com';
    const expected = 'www.example.com';
    const result = removeProtocol(url);
    expect(result).toEqual(expected);
  });

  it('should not remove the protocol if the URL does not start with "http://" or "https://"', () => {
    const url = 'ftp://www.example.com';
    const result = removeProtocol(url);
    expect(result).toEqual(url);
  });

  it('should not remove the protocol if the URL does not match the valid URL regex', () => {
    const url = 'invalid-url';
    const result = removeProtocol(url);
    expect(result).toEqual(url);
  });
});
