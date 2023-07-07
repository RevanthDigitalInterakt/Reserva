import type { PrimeDetailOutput } from '../src/base/graphql/generated';

export const mockPrimeData: PrimeDetailOutput = {
  __typename: 'PrimeDetailOutput',
  discountFrom: 499,
  discountPercentage: 20,
  installmentPrice: 25,
  installmentQty: 12,
  monthlyCashback: 25,
  productId: 35126,
  productSeller: '1',
  skuId: 348009,
};

export const addToCartMock = jest.fn();
