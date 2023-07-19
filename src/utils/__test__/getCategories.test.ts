import { getCategoriesByHref } from '../getCategoriesByHref';

describe('get product categories', () => {
  it('should return categories in string', () => {
    const categories = '/reserva/masculino/casacos';

    expect(getCategoriesByHref(categories)).toBe('reserva-masculino-casacos');
  });

  it('should return empty string', () => {
    const categories = '';

    expect(getCategoriesByHref(categories)).toBe('');
  });
});
