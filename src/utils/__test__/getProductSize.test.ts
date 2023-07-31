import { getProductSize } from '../getProductSize';

interface IVariation {
  name: string;
  values: string[]
}

describe('get product colors', () => {
  const item: IVariation[] = [
    {
      name: 'Tamanho',
      values: ['G'],
    },
  ];

  it('should return size', () => {
    expect(getProductSize(item)).toBe('G');
  });

  it('should return default size for undefined value', () => {
    const items: IVariation[] = undefined;
    expect(getProductSize(items)).toBe('P');
  });
});
