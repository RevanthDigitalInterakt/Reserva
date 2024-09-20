import { formatProductClusterIds } from '../formatProductClusterIds';

describe('formatProductClusterIds', () => {
  it('Deve formatar "PRODUCTclusterids" para "productClusterIds"', () => {
    expect(formatProductClusterIds('PRODUCTclusterids')).toBe('productClusterIds');
  });

  it('Deve formatar "proDUCTCLUSterids" para "productClusterIds"', () => {
    expect(formatProductClusterIds('proDUCTCLUSterids')).toBe('productClusterIds');
  });

  it('Deve formatar "ProductClusterIDs" para "productClusterIds"', () => {
    expect(formatProductClusterIds('ProductClusterIDs')).toBe('productClusterIds');
  });

  it('Deve formatar "PrOdUcTcLuStErIdS" para "productClusterIds"', () => {
    expect(formatProductClusterIds('PrOdUcTcLuStErIdS')).toBe('productClusterIds');
  });

  it('Deve formatar "productclusterids" para "productClusterIds"', () => {
    expect(formatProductClusterIds('productclusterids')).toBe('productClusterIds');
  });

  it('Deve lidar com strings vazias', () => {
    expect(formatProductClusterIds('')).toBe('productClusterIds');
  });
});
