import type { ProductOutput } from '../../../base/graphql/generated';
import type { ProductQL } from '../../../graphql/products/productSearch';

interface IRecommendationState {
  showMore: boolean
  products: Array<ProductQL>
  setShowMore: (value: boolean) => void
  setProducts: (value: Array<ProductOutput>) => void
}
export type {
  IRecommendationState,
};
