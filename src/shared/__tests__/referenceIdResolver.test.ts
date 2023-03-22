import { referenceIdResolver } from '../utils/referenceIdResolver';

describe('referenceIdResolver test', () => {
  it('should return empty string when undefined passed', () => {
    const result = referenceIdResolver();
    expect(result).toEqual('');
  });
  it('should return referenceId when a referenceId is passed', () => {
    const result = referenceIdResolver('collection:123');
    expect(result).toEqual('collection:123');
  });
  it('should return referenceId when a referenceId is passed', () => {
    const result = referenceIdResolver('XPTO=123');
    expect(result).toEqual('XPTO=123');
  });
  it('should return query id when queryField is passed', () => {
    const result = referenceIdResolver('queryField=123');
    expect(result).toEqual('collection:123');
  });
  it('should return query id when queryField is passed with other params', () => {
    const result = referenceIdResolver('queryField=123&param=1');
    expect(result).toEqual('collection:123');
  });
  it('should return query id when queryField is empty', () => {
    const result = referenceIdResolver('queryField=&param=1');
    expect(result).toEqual('');
  });
});
