import { getProductCategories } from '../getProductCategories';

describe('get product categories', () => {
  it('should return categories in string', () => {
    const categories = ['Reserva', 'Masculino', 'Casacos'];

    expect(getProductCategories(categories)).toBe('reserva-masculino-casacos');
  });

  it('should return empty array', () => {
    const categories: string[] = [];

    expect(getProductCategories(categories)).toBe('');
  });

  it('should return undefined', () => {
    const categories = undefined;

    expect(getProductCategories(categories as any)).toBe(undefined);
  });
});
