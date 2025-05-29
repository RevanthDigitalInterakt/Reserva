import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {
  HomeCarouselsDocument, HomeConfigDocument, HomeMediasDocument, OffersCarouselsDocument,
} from '../base/graphql/generated';
import { getApolloClient } from '../utils/getApolloClient';
import { apolloFetchPolicyStore } from './useApolloFetchPolicyStore';

export interface IHomeStore {
  loading: boolean;
  hasTabBar: boolean;
  carousels: HomeCarouselOutput[];
  offersCarousels: OffersCarouselsOutput[];
  medias: HomeMediaOutput[];
  offersPage?: string;
  shelfOffers: {
    shelfProductsBottom: string,
    shelfProductsTop: string,
    shelfSubtitleBottom: string,
    shelfSubtitleTop: string,
    shelfTitle: string,
  }
  commercialBannerCollection?: ConfigCommercialBannerOutput[],
  onLoad: () => Promise<void>;
  setHasTabBar: (hasTabBar: boolean) => void;
  firstTimeAppOpen: boolean;
  checkIfFirstLaunch: (appState: boolean) => void;
  selectedStateGeolocation: string;
  onSelectStateGeolocation: (geoState: string) => void;
}

const homeStore = create<IHomeStore>((set) => ({
  selectedStateGeolocation: 'Clique aqui para selecionar seu estado...',
  firstTimeAppOpen: false,
  loading: true,
  hasTabBar: true,
  carousels: [],
  offersCarousels: [],
  discountBar: undefined,
  offersPage: undefined,
  shelfOffers: {
    shelfProductsBottom: '',
    shelfProductsTop: '',
    shelfSubtitleBottom: '',
    shelfSubtitleTop: '',
    shelfTitle: '',
  },
  commercialBannerCollection: undefined,
  medias: [],
  setHasTabBar: (hasTabBar) => set(() => ({ hasTabBar })),
  onLoad: async () => {
    const client = getApolloClient();

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
      loading: true,
      carousels: homeData.homeCarousels,
      offersCarousels: offersData.offersCarousels,
      shelfOffers: {
        shelfTitle: offersData.offersCarousels[0]?.shelfTitle || '',
        shelfProductsBottom: offersData.offersCarousels[0]?.shelfProductsBottom || '',
        shelfProductsTop: offersData.offersCarousels[0]?.shelfProductsTop || '',
        shelfSubtitleBottom: offersData.offersCarousels[0]?.shelfSubtitleBottom || '',
        shelfSubtitleTop: offersData.offersCarousels[0]?.shelfSubtitleTop || '',
      },
    }));

    try {
      const { data } = await client.query<HomeCarouselsQuery, HomeCarouselsQueryVariables>({
        context: { clientName: 'gateway' },
        fetchPolicy: getFetchPolicyPerKey('homeCarousels'),
        query: HomeCarouselsDocument,
      });

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
        loading: false,
        carousels: data.homeCarousels,
      } as IHomeStore));
    } catch {
      set(() => ({
        loading: false,
      }));
    }
  },
  checkIfFirstLaunch: async (appState) => {
    await AsyncStorage.setItem('FIRST_TIME_OPEN', 'false');
    set(() => ({
      firstTimeAppOpen: appState,
    }));
  },
  onSelectStateGeolocation: (geoState) => {
    set(() => ({
      selectedStateGeolocation: geoState,
    }));
  },
}));

export const useHomeStore = createZustandStoreWithSelectors(homeStore);
