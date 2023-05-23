import type { ProductRecommendationOutput } from '../../../base/graphql/generated';
import type { ProductQL } from '../../../graphql/products/productSearch';

interface IRecommendationState {
  showSection: boolean
  products: Array<ProductQL>
  setShowSection: (value: boolean) => void
  setProducts: (value: ProductRecommendationOutput[]) => void
}
export type {
  IRecommendationState,
};
