export interface IFacet {
  key: string,
  value: string,
}
export interface IPriceRange {
  from: number,
  to: number,
}
export interface IGenerateFacetsParams {
  reference?: string,
  categories?: string[],
  priceFilter?: IPriceRange,
  colors?: { key: string, value: string }[],
  sizes?: { key: string, value: string }[],
}

export interface IFilters extends IGenerateFacetsParams {}

const IS_CATEGORY_SUBTYPE = 'category' as const;

const handleReference = (reference: string):IFacet[] => {
  if (!reference) return [];
  const selectedFacets: IFacet[] = [];

  if (reference.includes('queryField' && 'mapField')) {
    const [queryField, mapField] = reference?.split('&');
    const arrayQueryField = queryField?.split('=')[1]?.split(',');
    const arrayMapField = mapField?.split('=')[1]?.split(',');

    if (arrayMapField && arrayQueryField) {
      arrayMapField.forEach((key, indexValue) => {
        const value = arrayQueryField[indexValue];
        if (!!key && !!value) {
          selectedFacets.push({
            key,
            value,
          });
        }
      });
      return selectedFacets;
    }
  }

  const [subType, subcategories] = reference.split(':');

  if (!subType || !subcategories) return [];

  if (subType !== IS_CATEGORY_SUBTYPE) {
    selectedFacets.push({
      key: 'productClusterIds',
      value: subcategories,
    });

    return selectedFacets;
  }

  subcategories.split('|').forEach((sub: string): void => {
    if (sub !== '') {
      selectedFacets.push({
        key: 'c',
        value: sub,
      });
    }
  });

  return selectedFacets;
};

const handleCategories = (categories: string[]):IFacet[] => {
  const selectedFacets: IFacet[] = [];
  categories.forEach((category) => {
    selectedFacets.push(...handleReference(category));
  });
  return selectedFacets;
};

const handlePriceFilter = (priceFilter: { from:number, to:number }):IFacet => ({ key: 'priceRange', value: `${priceFilter.from} TO ${priceFilter.to}` });

export const generateFacets = (filters?:IGenerateFacetsParams): IFacet[] => {
  const facets:IFacet[] = [];

  if (!filters) return facets;

  const {
    reference, categories, priceFilter, colors, sizes,
  } = filters;

  if (reference) facets.push(...handleReference(reference));
  if (categories) facets.push(...handleCategories(categories));
  if (priceFilter) facets.push(handlePriceFilter(priceFilter));
  if (colors) facets.push(...colors.map(({ key, value }) => ({ key, value })));
  if (sizes) facets.push(...sizes.map(({ key, value }) => ({ key, value })));

  const uniqueFacets = facets.filter(
    (facet, index, self) => index === self.findIndex(
      (facetItem) => facetItem.key === facet.key && facetItem.value === facet.value,
    ),
  );

  return uniqueFacets;
};
