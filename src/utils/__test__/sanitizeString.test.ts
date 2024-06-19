import { sanitizeString } from '../sanitizeString';

describe('sanitizeString', () => {
  it('should replace spaces with underscores', () => {
    const result = sanitizeString('hello world');
    expect(result).toBe('hello_world');
  });

  it('should remove invalid characters', () => {
    const result = sanitizeString('hello@world!');
    expect(result).toBe('helloworld');
  });

  it('should keep valid characters', () => {
    const result = sanitizeString('hello-world_123');
    expect(result).toBe('hello-world_123');
  });
});
