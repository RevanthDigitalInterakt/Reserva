import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import type {
  ConfigOutput,
  HomeCarouselOutput,
  HomeCarouselsQuery,
  HomeCarouselsQueryVariables,
  HomeConfigQuery,
  HomeConfigQueryVariables,
  HomeMediaOutput,
  HomeMediasQuery,
  HomeMediasQueryVariables,
} from '../base/graphql/generated';
import { HomeCarouselsDocument, HomeConfigDocument, HomeMediasDocument } from '../base/graphql/generated';
import { getApolloClient } from '../utils/getApolloClient';
import { apolloFetchPolicyStore } from './useApolloFetchPolicyStore';

interface IHomeStore {
  loading: boolean;
  loaded: boolean;
  carousels: HomeCarouselOutput[];
  medias: HomeMediaOutput[];
  discountBar: ConfigOutput['discountCodeBar'];
  offersPage?: string;
  onLoad: () => Promise<void>;
}

const homeStore = create<IHomeStore>((set, getState) => ({
  loading: false,
  loaded: false,
  carousels: [],
  discountBar: undefined,
  offersPage: undefined,
  medias: [],
  onLoad: async () => {
    const client = getApolloClient();

    if (getState().loaded) return;

    set(() => ({ loading: true }));

    const { getFetchPolicyPerKey } = apolloFetchPolicyStore.getState();

    const { data } = await client.query<HomeCarouselsQuery, HomeCarouselsQueryVariables>({
      context: { clientName: 'gateway' },
      fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
      query: HomeCarouselsDocument,
    });

    set(() => ({
      loading: false,
      carousels: data.homeCarousels,
    }));

    const [medias, config] = await Promise.all([
      client.query<HomeMediasQuery, HomeMediasQueryVariables>({
        context: { clientName: 'gateway' },
        fetchPolicy: getFetchPolicyPerKey('homeMedias'),
        query: HomeMediasDocument,
      }),
      client.query<HomeConfigQuery, HomeConfigQueryVariables>({
        context: { clientName: 'gateway' },
        fetchPolicy: getFetchPolicyPerKey('homeConfig'),
        query: HomeConfigDocument,
      }),
    ]);

    set(() => ({
      medias: medias.data.homeMedias || [],
      discountBar: config.data.homeConfig?.discountCodeBar,
      offersPage: config.data.homeConfig?.offersPage || undefined,
      loaded: true,
    }));
  },
}));

export const useHomeStore = createZustandStoreWithSelectors(homeStore);
