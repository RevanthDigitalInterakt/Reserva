import { getBrandByUrl } from '../getBrandByURL';

interface Item {
  categoryTree: [
    {
      href: string;
    },
  ]
}

describe('getBrandByUrl', () => {
  const items: Item = {
    categoryTree: [
      {
        href: '/reserva',
      },
    ],
  };

  it('should return "Reserva" for "/reserva" url', () => {
    expect(getBrandByUrl(items)).toBe('RESERVA,');
  });

  it('should return "Reserva Go" for "/go-reserva" url', () => {
    items.categoryTree[0].href = '/go-reserva';

    expect(getBrandByUrl(items)).toBe('RESERVA GO,');
  });

  it('should return "Reserva Go" for "/colecao-reserva/calcados" url', () => {
    items.categoryTree[0].href = '/colecao-reserva/calcados';

    expect(getBrandByUrl(items)).toBe('RESERVA GO,');
  });

  it('should return "Reserva Mini" for "/mini" url', () => {
    items.categoryTree[0].href = '/mini';

    expect(getBrandByUrl(items)).toBe('RESERVA MINI,');
  });

  it('should return "Reserva Mini" for "/colecao-mini/calcados" url', () => {
    items.categoryTree[0].href = '/colecao-mini/calcados';

    expect(getBrandByUrl(items)).toBe('RESERVA MINI,');
  });

  it('should return "Reversa" for "/reversa" url', () => {
    items.categoryTree[0].href = '/reversa';

    expect(getBrandByUrl(items)).toBe('REVERSA,');
  });

  it('should return "Reversa" for "/colecao-reversa" url', () => {
    items.categoryTree[0].href = '/colecao-reversa';

    expect(getBrandByUrl(items)).toBe('REVERSA,');
  });

  it('should return "Reversa" for "/Feminino" url', () => {
    items.categoryTree[0].href = '/Feminino';

    expect(getBrandByUrl(items)).toBe('REVERSA,');
  });

  it('should return "Reversa Go" for "/go-reserva/feminino" url', () => {
    items.categoryTree[0].href = '/go-reserva/feminino';

    expect(getBrandByUrl(items)).toBe('RESERVA GO,');
  });

  it('should return "Reserva" for undefined url', () => {
    items.categoryTree[0].href = undefined;

    expect(getBrandByUrl(items)).toBe('RESERVA,');
  });
});
