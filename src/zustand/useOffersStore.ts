import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import type {
  ConfigCommercialBannerOutput,
  HomeCarouselOutput,
  HomeMediaOutput,
  OffersPageQuery,
  OffersPageQueryVariables,
} from '../base/graphql/generated';
import { OffersPageDocument } from '../base/graphql/generated';
import { getApolloClient } from '../utils/getApolloClient';

interface IOffersStore {
  loading: boolean;
  hasTabBar: boolean;
  carousels: HomeCarouselOutput[];
  medias: HomeMediaOutput[];
  commercialBannerCollection?: ConfigCommercialBannerOutput[],
  collectionFilters: {
    title: string;
    items: {
      collectionId: string;
      offerImage: string;
      offerName: string;
      fromPriceFilter?: string | null;
      toPriceFilter?: string | null;
      sizeFilter?: string | null;
      colorFilter?: string | null;
    }[]
  }
  onLoad: () => Promise<void>;
  setHasTabBar: (hasTabBar: boolean) => void;
}

const offersStore = create<IOffersStore>((set) => ({
  loading: true,
  hasTabBar: true,
  carousels: [],
  discountBar: undefined,
  offersPage: undefined,
  commercialBannerCollection: undefined,
  collectionFilters: {
    items: [],
    title: '',
  },
  medias: [],
  setHasTabBar: (hasTabBar) => set(() => ({ hasTabBar })),
  onLoad: async () => {
    const client = getApolloClient();
    set(() => ({
      loading: true,
    }));
    try {
      const { data } = await client.query<OffersPageQuery, OffersPageQueryVariables>({
        context: { clientName: 'gateway' },
        query: OffersPageDocument,
      });

      set(() => ({
        collectionFilters: {
          items: data.offersPageCollectionFilter.items,
          title: data.offersPageCollectionFilter.title,
        },
      }));
    } catch {
      set(() => ({
        loading: false,
      }));
    }
  },
}));

export const useOffersStore = createZustandStoreWithSelectors(offersStore);
