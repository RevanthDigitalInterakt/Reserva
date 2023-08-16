import type { SearchProductFacetInput } from '../base/graphql/generated';

export interface IFacets {
  __typename: string;
  name: string;
  values: [
    { __typename: string,
      id: string,
      name: string,
      value: string,
      range: null,
      key: string,
      quantity: number
    },
  ]
}

export function getCollectionFacetsValue(facets?: IFacets[] | SearchProductFacetInput[]) {
  if (!facets?.length) return '';

  const collectionFacets = facets.filter(
    ({ name, key }: any) => name === 'productClusterNames' || key === 'productClusterIds',
  );

  const [items] = collectionFacets;

  const values = (items?.values || []).map(({ value }) => value?.replace(/-+/g, '-'));

  return values.join(', ');
}
