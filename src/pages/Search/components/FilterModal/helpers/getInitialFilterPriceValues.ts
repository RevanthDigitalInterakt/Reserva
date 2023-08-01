import type { IPriceRange } from '../../../../../utils/generateFacets';
import type { TFilterType } from '../FilterModal';
import { getMaxPrice } from './getMaxPrice';
import { getMinPrice } from './getMinPrice';

export const getInitialFilterPriceValues = (
  priceRange?:{ range:IPriceRange }[],
  filterList?: TFilterType[],
):number[] => {
  if (!priceRange?.length) return [0, 0];
  const minPrice = getMinPrice(priceRange);
  const maxPrice = getMaxPrice(priceRange);
  if (!filterList?.length) return [minPrice, maxPrice];

  const filterListFiltered = filterList.filter((item) => item?.key === 'priceRange');

  if (!filterListFiltered?.length) return [minPrice, maxPrice];

  const princeRangeParams = filterListFiltered.map((item) => {
    const range = item?.value?.split(' TO ');
    return [parseInt(range[0], 10), parseInt(range[1], 10)];
  })[0];

  if (!princeRangeParams?.length) return [minPrice, maxPrice];

  const initialPriceRange: number[] = [];
  const isMinPriceValid = princeRangeParams[0] && princeRangeParams[0] >= minPrice;
  const isMaxPriceValid = princeRangeParams[1] && princeRangeParams[1] <= maxPrice;

  if (isMinPriceValid && princeRangeParams[0]) {
    initialPriceRange.push(princeRangeParams[0]);
  } else {
    initialPriceRange.push(minPrice);
  }

  if (isMaxPriceValid && princeRangeParams[1]) {
    initialPriceRange.push(princeRangeParams[1]);
  } else {
    initialPriceRange.push(maxPrice);
  }
  return initialPriceRange;
};
