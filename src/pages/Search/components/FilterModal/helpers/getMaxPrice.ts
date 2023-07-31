import type { IPriceRange } from '../../../../../utils/generateFacets';

export const getMaxPrice = (priceRange?:{ range:IPriceRange }[]) => {
  if (!priceRange?.length) return 0;

  const biggestPrice = priceRange
    .map(({ range }) => range.to)
    .sort((p, n) => n - p)[0];

  return parseInt(`${biggestPrice || 1}`, 10);
};
