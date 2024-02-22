interface IRecommendationShelfState {
  onSearchShelf: (page: string) => Promise<any[]>;
}
export type {
  IRecommendationShelfState,
};
