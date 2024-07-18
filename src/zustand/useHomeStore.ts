import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import type {
  ConfigCommercialBannerOutput,
  HomeCarouselOutput,
  HomeCarouselsQuery,
  HomeCarouselsQueryVariables,
  HomeConfigQuery,
  HomeConfigQueryVariables,
  HomeMediaOutput,
  HomeMediasQuery,
  HomeMediasQueryVariables,
  OffersCarouselsOutput,
  OffersCarouselsQuery,
} from '../base/graphql/generated';
import { HomeCarouselsDocument, HomeConfigDocument, HomeMediasDocument, OffersCarouselsDocument } from '../base/graphql/generated';
import { getApolloClient } from '../utils/getApolloClient';
import { apolloFetchPolicyStore } from './useApolloFetchPolicyStore';

interface IHomeStore {
  loading: boolean;
  hasTabBar: boolean;
  loaded: boolean;
  carousels: HomeCarouselOutput[];
  offersCarousels: OffersCarouselsOutput[];
  medias: HomeMediaOutput[];
  offersPage?: string;
  commercialBannerCollection?: ConfigCommercialBannerOutput[],
  onLoad: () => Promise<void>;
  setHasTabBar: (hasTabBar: boolean) => void;
}

const homeStore = create<IHomeStore>((set, getState) => ({
  loading: false,
  hasTabBar: true,
  loaded: false,
  carousels: [],
  offersCarousels: [],
  discountBar: undefined,
  offersPage: undefined,
  commercialBannerCollection: undefined,
  medias: [],
  setHasTabBar: (hasTabBar) => set(() => ({ hasTabBar })),
  onLoad: async () => {
    const client = getApolloClient();

    if (getState().loaded) return;

    set(() => ({ loading: true }));

    const { getFetchPolicyPerKey } = apolloFetchPolicyStore.getState();

    const { data: homeData } = await client.query<HomeCarouselsQuery, HomeCarouselsQueryVariables>({
      context: { clientName: 'gateway' },
      fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
      query: HomeCarouselsDocument,
    });

    const { data: offersData } = await client.query<OffersCarouselsQuery>({
      context: { clientName: 'gateway' },
      fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
      query: OffersCarouselsDocument,
    });

    set(() => ({
      loading: false,
      carousels: homeData.homeCarousels,
      offersCarousels: offersData.offersCarousels,
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
      offersPage: config.data.homeConfig?.offersPage || undefined,
      commercialBannerCollection: config.data.homeConfig?.commercialBannerCollection || undefined,
      loaded: true,
    }));
  },
}));

export const useHomeStore = createZustandStoreWithSelectors(homeStore);
