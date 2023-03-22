import { queryFieldParser } from '../utils/referenceIdResolver';

describe('queryFieldParser test', () => {
  it('should return empty string when empty string is not passed', () => {
    const result = queryFieldParser('');
    expect(result).toEqual('');
  });
  it('should return empty string when queryField is not passed', () => {
    const result = queryFieldParser('collection:123');
    expect(result).toEqual('');
  });
  it('should return query id when queryField is passed', () => {
    const result = queryFieldParser('queryField=123');
    expect(result).toEqual('collection:123');
  });
  it('should return empty string when queryField is empty', () => {
    const result = queryFieldParser('queryField=');
    expect(result).toEqual('');
  });
  it('should return query id when queryField is passed with other params', () => {
    const result = queryFieldParser('queryField=123&param=1');
    expect(result).toEqual('collection:123');
  });
  it('should return query id when queryField is passed with other params', () => {
    const result = queryFieldParser('param=1&queryField=123');
    expect(result).toEqual('collection:123');
  });
});
