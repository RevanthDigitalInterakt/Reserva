import type { RecommendationShelfQuery } from '../../../base/graphql/generated';

interface IRecommendationShelfState {
  onSearchShelf: (page: string) => Promise<RecommendationShelfQuery['recommendationShelf'][]>;
}
export type {
  IRecommendationShelfState,
};
