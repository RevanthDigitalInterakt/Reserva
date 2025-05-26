import { filterValidParams } from '../filterValidParams';

describe('filterValidParams', () => {
  it('should filter out invalid and null parameters', () => {
    const objectParams = {
      name: 'John', age: '30', invalidKey: 'test', nullable: 'null',
    };
    const validKeys = ['name', 'age', 'nullable'];
    const result = filterValidParams(objectParams, validKeys);
    expect(result).toEqual({ name: 'John', age: '30' });
  });

  it('should return an empty object if no valid keys are present', () => {
    const objectParams = { invalidKey: 'test', nullable: 'null' };
    const validKeys = ['name', 'age'];
    const result = filterValidParams(objectParams, validKeys);
    expect(result).toEqual({});
  });

  it('should include keys with non-null values only', () => {
    const objectParams = { name: 'John', age: null, city: 'null' };
    const validKeys = ['name', 'age', 'city'];
    const result = filterValidParams(objectParams, validKeys);
    expect(result).toEqual({ name: 'John' });
  });
});
