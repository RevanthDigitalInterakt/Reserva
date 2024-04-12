import type { RecommendationShelfQuery } from '../../../base/graphql/generated';

interface IRecommendationShelfState {
  onSearchShelf: (user: string) => Promise<RecommendationShelfQuery['recommendationShelf'][]>;
}
export type {
  IRecommendationShelfState,
};
