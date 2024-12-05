import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import type {
  ConfigCommercialBannerOutput,
  HomeCarouselOutput,
  HomeMediaOutput,
  OffersPageQuery,
  OffersPageQueryVariables,
  OffersPageCollectionBannerCarouselQuery as BannerCarouselQuery,
  OffersPageCollectionBannerCarouselQueryVariables as BannerCarouselQueryVariables,
} from '../base/graphql/generated';
import { OffersPageDocument, OffersPageCollectionBannerCarouselDocument as BannerCarouselDocument } from '../base/graphql/generated';
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
      sizeFilter: string;
      colorFilter?: string;
    }[]
  }
  bannerCarousel: {
    title: string;
    items: {
      id?: string | null | undefined;
      banner: string;
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
  bannerCarousel: {
    title: '',
    items: [],
  },
  medias: [],
  setHasTabBar: (hasTabBar) => set(() => ({ hasTabBar })),
  onLoad: async () => {
    const client = getApolloClient();
    set(() => ({
      loading: true,
    }));
    try {
      const collectionFiltersPromise = client.query<OffersPageQuery, OffersPageQueryVariables>({
        context: { clientName: 'gateway' },
        query: OffersPageDocument,
      });
      const bannerCarouselPromise = client
        .query<BannerCarouselQuery, BannerCarouselQueryVariables>({
        context: { clientName: 'gateway' },
        query: BannerCarouselDocument,
      });

      const [collectionFilters, bannerCarousel] = await Promise.all([
        collectionFiltersPromise,
        bannerCarouselPromise,
      ]);

      set(() => ({
        collectionFilters: {
          items: collectionFilters.data.offersPageCollectionFilter.items,
          title: collectionFilters.data.offersPageCollectionFilter.title,
        },
        bannerCarousel: {
          items: bannerCarousel.data.offersPageCollectionBannerCarousel.items,
          title: bannerCarousel.data.offersPageCollectionBannerCarousel.title,
        },
      }));
    } catch { /* empty */ } finally {
      set(() => ({
        loading: false,
      }));
    }
  },
}));

export const useOffersStore = createZustandStoreWithSelectors(offersStore);
