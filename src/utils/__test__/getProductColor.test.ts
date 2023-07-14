import { getProductColor } from '../getProductColor';

interface IVariation {
  name: string;
  values: string[]
}

describe('get product colors', () => {
	const item: IVariation[] = [
		{
			name: 'COR',
			values: ['VERMELHO'],
		},
	];

  it('should return color', () => {
    expect(getProductColor(item)).toBe('VERMELHO');
  });

	it('should return default color for undefined value', () => {
		const items: IVariation[] = undefined;
		expect(getProductColor(items)).toBe('Branco');
	});
});
