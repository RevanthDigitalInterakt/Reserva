import { handleObjectToQueryParams } from '../handleObjectToQueryParams';

describe('handleObjectToQueryParams', () => {
  const validKeys = ['name', 'age', 'nullable'];

  it('should handle the conversion of object parameters to a query string', () => {
    const objectParams = {
      name: 'John', age: '30', invalidKey: 'test', nullable: 'null',
    };

    const result = handleObjectToQueryParams(objectParams, validKeys);

    expect(result).toBe('name=john&age=30');
  });

  it('should return an empty string if no valid keys are present', () => {
    const objectParams = { invalidKey: 'test', nullable: 'null' };

    const validKeysRefactor = validKeys;
    validKeysRefactor.pop();

    const result = handleObjectToQueryParams(objectParams, validKeysRefactor);

    expect(result).toBe('');
  });

  it('should encode special characters in the final query string', () => {
    const objectParams = { name: 'Jo&hn test', age: '30', nullable: 'null' };
    const result = handleObjectToQueryParams(objectParams, validKeys);

    expect(result).toBe('name=john-test&age=30');
  });
});
