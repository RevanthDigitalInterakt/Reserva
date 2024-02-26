import { create } from 'zustand';
import {
  RecommendationShelfDocument, TrackProvidersEnum,
  type RecommendationShelfQuery, type RecommendationShelfQueryVariables,
  SmarthintShelfChannelEnum, TrackPageTypeEnum,
} from '../../base/graphql/generated';
import type { IRecommendationShelfState } from './types/recommendationShelf';
import { getApolloClient } from '../../utils/getApolloClient';

const useRecommendationShelf = create<IRecommendationShelfState>(() => ({
  onSearchShelf: async (_page: string) => {
    try {
      const client = getApolloClient();

      const { data } = await client
        .query<RecommendationShelfQuery, RecommendationShelfQueryVariables>({
        context: { clientName: 'gateway' },
        query: RecommendationShelfDocument,
        variables: {
          input: {
            providers: [TrackProvidersEnum.Smarthint],
            userIdentifier: 'email@gmail.com',
            channel: [SmarthintShelfChannelEnum.Padrao],
            pageType: TrackPageTypeEnum.Home,
            position: 2,
          },
        },
        fetchPolicy: 'no-cache',
      });
      return [data.recommendationShelf];
    } catch (e) {
      return [];
    }
  },
}));

export default useRecommendationShelf;
