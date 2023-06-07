import { formatDate, formatAndSearcFieldValue } from '../GenericFormats';

describe('formatDate', () => {
  test('should format the date correctly', () => {
    const input = '2022-01-01T12:00:00Z';

    const result = formatDate(input);

    expect(result).toBe('01/01/2022');
  });

  test('should return an empty string for an empty date', () => {
    const input = '';

    const result = formatDate(input);

    expect(result).toBe('');
  });
});

describe('formatAndSearcFieldValue', () => {
  test('should return the value of the specified search field', () => {
    const customFields = [
      {
        __typename: 'CustomField', cacheId: '1', key: 'name', value: 'John Doe',
      },
      {
        __typename: 'CustomField', cacheId: '2', key: 'age', value: '30',
      },
    ];
    const searchField = 'name';
    const defaultReturn = 'Default';

    const result = formatAndSearcFieldValue(customFields, searchField, defaultReturn);

    expect(result).toBe('John Doe');
  });

  test('should return the default value if the search field is not found', () => {
    const customFields = [
      {
        __typename: 'CustomField', cacheId: '1', key: 'name', value: 'John Doe',
      },
      {
        __typename: 'CustomField', cacheId: '2', key: 'age', value: '30',
      },
    ];
    const searchField = 'address';
    const defaultReturn = 'Default';

    const result = formatAndSearcFieldValue(customFields, searchField, defaultReturn);

    expect(result).toBe('Default');
  });

  test('should return the default value if the value of the search field is "null"', () => {
    const customFields = [
      {
        __typename: 'CustomField', cacheId: '1', key: 'name', value: 'null',
      },
    ];
    const searchField = 'name';
    const defaultReturn = 'Default';

    const result = formatAndSearcFieldValue(customFields, searchField, defaultReturn);

    expect(result).toBe('Default');
  });

  test('should return the default value if the value of the search field is an empty string', () => {
    const customFields = [
      {
        __typename: 'CustomField', cacheId: '1', key: 'name', value: '',
      },
    ];
    const searchField = 'name';
    const defaultReturn = 'Default';

    const result = formatAndSearcFieldValue(customFields, searchField, defaultReturn);

    expect(result).toBe('Default');
  });
});
