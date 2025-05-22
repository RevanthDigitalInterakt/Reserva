import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import {
  SearchDocument,
  SearchOrderByEnum,
  SearchProviderEnum,
  type ProductListOutput,
  type SearchProductInput,
  type SearchQuery,
  type SearchQueryVariables,
} from '../../base/graphql/generated';
import type { IRsvRecommendation } from '../../pages/Offers/Components/ShelfOffers';
import { getApolloClient } from '../../utils/getApolloClient';
import { generateFacets } from '../../utils/generateFacets';
import { getShelfData } from '../../utils/getShelfData';
import type { IHomeStore } from '../useHomeStore';

interface IShelfOffersStore {
  loading: boolean;
  shelfTop: ProductListOutput[];
  shelfBottom: ProductListOutput[];
  parameters: SearchProductInput;
  shelfInfo: IRsvRecommendation[];
  onLoadOffersShelf: (data: IHomeStore['shelfOffers']) => Promise<void>;
}

const initialData = {
  loading: false,
  shelfTop: [],
  shelfBottom: [],
  shelfInfo: [],
  parameters: {
    facets: [],
    page: 1,
    q: '',
    orderBy: SearchOrderByEnum.OrderByScoreDesc,
    perPage: 6,
    priceRange: null,
    analitycsTags: ['app'],
  },
};

const shelfOffersStore = create<IShelfOffersStore>((set, getState) => ({
  ...initialData,
  onLoadOffersShelf: async (data) => {
    set(() => ({
      loading: true,
    }));

    if (!data.shelfProductsTop && !data.shelfProductsBottom) return;

    try {
      const client = getApolloClient();

      const provider = SearchProviderEnum.Algolia;

      const shelfProductsTopFacets = generateFacets(
        { reference: data?.shelfProductsTop || '' },
      );

      const shelfTopParameters = {
        ...{ provider },
        ...getState().parameters,
        facets: shelfProductsTopFacets,
      };

      const shelfProductsBottomFacets = generateFacets(
        { reference: data?.shelfProductsBottom || '' },
      );

      const shelfBottomParameters = {
        ...{ provider },
        ...getState().parameters,
        facets: shelfProductsBottomFacets,
      };

      const [{ data: payloadTop }, { data: payloadBottom }] = await Promise.all([
        client.query<SearchQuery, SearchQueryVariables>({
          notifyOnNetworkStatusChange: true,
          context: { clientName: 'gateway' },
          fetchPolicy: 'no-cache',
          query: SearchDocument,
          variables: {
            input: shelfTopParameters,
          },
        }),
        client.query<SearchQuery, SearchQueryVariables>({
          notifyOnNetworkStatusChange: true,
          context: { clientName: 'gateway' },
          fetchPolicy: 'no-cache',
          query: SearchDocument,
          variables: {
            input: shelfBottomParameters,
          },
        }),
      ]);

      const arrTopSliced = payloadTop?.search?.items.slice(0, 6);
      const arrBottomSliced = payloadBottom?.search?.items.slice(0, 6);

      const shelfTop = getShelfData(arrTopSliced);
      const shelfBottom = getShelfData(arrBottomSliced);

      const shelfInfo = [
        {
          shelfTitle: data.shelfTitle,
          shelfName: data.shelfSubtitleTop,
          products: shelfTop,
          id: data.shelfProductsTop,
        },
        {
          shelfTitle: '',
          shelfName: data.shelfSubtitleBottom,
          products: shelfBottom,
          id: data.shelfProductsBottom,
        },
      ];

      set(() => ({
        shelfTop: payloadTop.search.items,
        shelfBottom: payloadBottom.search.items,
        shelfInfo,
        loading: false,
      } as IShelfOffersStore));
    } catch {
      set(() => ({
        loading: false,
      }));
    }
  },
}));

export const useShelfOffersStore = createZustandStoreWithSelectors(shelfOffersStore);
