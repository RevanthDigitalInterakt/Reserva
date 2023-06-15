import { getCollectionFacetsValue } from '../getCollectionFacetsValue';
import type { IFacets } from '../getCollectionFacetsValue';

describe('getCollectionFacetsValue', () => {
  const collection: IFacets[] = [{
    __typename: 'vtex_searchgraphql_0_53_0_Facet',
    name: 'productClusterNames',
    values:
    [
      {
        __typename: 'vtex_searchgraphql_0_53_0_FacetValue',
        id: '986',
        name: 'Reserva coleção geral flamengo',
        value: 'reserva-colecao-geral-flamengo',
        range: null,
        key: 'productclusternames',
        quantity: 1,
      },
    ],
  },
  ];

  const collectionNoValue = [{
    __typename: 'vtex_searchgraphql_0_53_0_Facet',
    name: 'productClusterNames',
    values:
    [
      {
        __typename: 'vtex_searchgraphql_0_53_0_FacetValue',
        id: '986',
        name: 'Reserva coleção geral flamengo',
        range: null,
        key: 'productclusternames',
        quantity: 1,
      },
    ],
  },
  ];

  it('should return collection', () => {
    expect(getCollectionFacetsValue(collection)).toBe('reserva-colecao-geral-flamengo');
  });

  it('should return an empty string when collections is an empty array', () => {
    expect(getCollectionFacetsValue()).toBe('');
  });

  it('should return an empty string when collections has no value', () => {
    expect(getCollectionFacetsValue(collectionNoValue)).toBe('');
  });
});
