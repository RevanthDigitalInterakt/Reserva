import type { IPriceRange } from '../../../../../utils/generateFacets';

export const getMinPrice = (priceRange?:{ range:IPriceRange }[]) => {
  if (!priceRange?.length) return 0;
  const smallestPrice = priceRange
    .map(({ range }) => range.from)
    .sort((p, n) => p - n)[0];

  return parseInt(`${smallestPrice || 0}`, 10);
};
