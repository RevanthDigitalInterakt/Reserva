import { isArray } from '@apollo/client/utilities';

interface Item {
  categoryTree: [
    {
      href: string;
    },
  ]
}

export const BRANDS = {
  RESERVA: 'RESERVA,',
  RESERVA_GO: 'RESERVA GO,',
  RESERVA_MINI: 'RESERVA MINI,',
  REVERSA: 'REVERSA,',
  REVERSA_GO: 'REVERSA GO,',
  RESERVA_GO_MINI: 'RESERVA GO MINI,',
};

export const getBrandByUrl = (items: Item): string => {
  const getCategoryUrl = (item: Item): string | undefined => item?.categoryTree?.[0]?.href;

  const isReserva = (url: string | undefined): boolean => !!url && url.includes('/reserva');

  const isGoOrCalcados = (url: string | undefined): boolean => !!url && (url.includes('/go-reserva') || url.includes('/colecao-reserva/calcados'));

  const isMiniOrCalcadosMini = (url: string | undefined): boolean => !!url && (url.includes('/mini') || url.includes('/colecao-mini/calcados'));

  const isReversaOrFeminino = (url: string | undefined): boolean => !!url && (url.includes('/reversa') || url.includes('/colecao-reversa') || url.includes('/Feminino'));

  if (isArray(items)) {
    const { categoryTree } = items[0] || {};
    const url = getCategoryUrl({ categoryTree });

    switch (true) {
      case isReserva(url):
        return BRANDS.RESERVA;
      case isGoOrCalcados(url):
        return BRANDS.RESERVA_GO;
      case isMiniOrCalcadosMini(url):
        return BRANDS.RESERVA_MINI;
      case isReversaOrFeminino(url):
        return BRANDS.REVERSA;
      default:
        return BRANDS.RESERVA;
    }
  }

  const { categoryTree } = items || {};
  const url = getCategoryUrl({ categoryTree });

  switch (true) {
    case isReserva(url):
      return BRANDS.RESERVA;
    case isGoOrCalcados(url):
      return BRANDS.RESERVA_GO;
    case isMiniOrCalcadosMini(url):
      return BRANDS.RESERVA_MINI;
    case isReversaOrFeminino(url):
      return BRANDS.REVERSA;
    default:
      return BRANDS.RESERVA;
  }
};
