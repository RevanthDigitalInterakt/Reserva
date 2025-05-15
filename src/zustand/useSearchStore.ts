import { create } from 'zustand';
import { Keyboard } from 'react-native';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import {
  type ProductListOutput,
  type SearchFacetColorItemOutput,
  type SearchProductInput,
  type SearchQuery,
  type SearchQueryVariables, TrackPageTypeEnum,
  type SearchFacetItemOutput,
  SearchDocument,
  SearchOrderByEnum,
  SearchProviderEnum,
} from '../base/graphql/generated';
import { getApolloClient } from '../utils/getApolloClient';
import EventProvider from '../utils/EventProvider';
import { getBrandByUrl } from '../utils/getBrandByURL';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { trackPageViewStore } from './useTrackPageViewStore/useTrackPageViewStore';
import { trackClickStore, type IData } from './useTrackClickStore/useTrackClickStore';
import ReactMoE, { MoEProperties } from 'react-native-moengage';

export enum SearchStatusEnum {
  INITIAL,
  SUGGESTIONS,
  RESULT,
}

export enum SearchType {
  CATALOG,
  SEARCH,
  DEFAULT,
}

const RESULT_PER_PAGE = 12;

const initialData = {
  initialized: false,
  loading: false,
  status: SearchStatusEnum.INITIAL,
  searchType: SearchType.DEFAULT,
  resultCount: 0,
  result: [],
  filters: {
    categories: new Set<SearchFacetItemOutput>(),
    colors: new Set<SearchFacetColorItemOutput>(),
    sizes: new Set<SearchFacetItemOutput>(),
    price: undefined,
  },
  parameters: {
    facets: [],
    page: 1,
    q: '',
    orderBy: SearchOrderByEnum.OrderByScoreDesc,
    perPage: RESULT_PER_PAGE,
    priceRange: null,
    analitycsTags: ['app'],
  },
};

interface ISearchStoreFilters {
  categories: Set<SearchFacetItemOutput>;
  colors: Set<SearchFacetColorItemOutput>;
  sizes: Set<SearchFacetItemOutput>;
  price?: { from: number; to: number }
}

interface ISearchStore {
  initialized: boolean,
  loading: boolean;
  searchType: SearchType;
  status: SearchStatusEnum;
  filters: ISearchStoreFilters;
  parameters: SearchProductInput;
  resultCount: number;
  result: ProductListOutput[];
  queryID?: string | null;
  setQueryID: (queryID: string) => void
  onInit: (searchType: SearchType) => void,
  setStatus: (status: SearchStatusEnum) => void;
  setQ: (s: string) => void;
  onSearch: (input: Partial<Omit<SearchProductInput, 'perPage'>>, filters?: ISearchStoreFilters) => Promise<void>;
  doFetchMore: () => void;
}

export const useSearchStore = create<ISearchStore>((set, getState) => ({
  initialized: false,
  loading: false,
  status: SearchStatusEnum.INITIAL,
  searchType: SearchType.DEFAULT,
  resultCount: 0,
  filters: {
    categories: new Set<SearchFacetItemOutput>(),
    colors: new Set<SearchFacetColorItemOutput>(),
    sizes: new Set<SearchFacetItemOutput>(),
    price: undefined,
  },
  parameters: {
    q: '',
    page: 1,
    orderBy: SearchOrderByEnum.OrderByScoreDesc,
    facets: [],
    perPage: RESULT_PER_PAGE,
    priceRange: null,
    provider: null,
    analitycsTags: ['app'],
  },
  result: [],
  queryID: '',
  setQueryID: (queryID: string) => set(() => ({
    queryID,
  })),
  onInit: (searchType) => set(() => ({
    ...initialData,
    searchType,
    initialized: true,
  })),
  setStatus: (status) => set(() => ({ status })),
  setQ: (q) => {
    const newParameters = { ...getState().parameters, q };
    set(() => ({ parameters: newParameters }));
  },
  onSearch: async (parameters, filters) => {
    try {
      const client = getApolloClient();

      Keyboard.dismiss();

      const { getBoolean } = useRemoteConfig.getState();
      const provider = getBoolean('show_on_smart_hint')
        ? SearchProviderEnum.Algolia
        : SearchProviderEnum.Vtex;

      const newParameters = {
        ...{ provider },
        ...getState().parameters,
        ...parameters,
      };

      set(() => ({
        loading: true,
        result: [],
        resultCount: 0,
        status: SearchStatusEnum.RESULT,
        parameters: newParameters,
      }));

      const { data } = await client.query<SearchQuery, SearchQueryVariables>({
        notifyOnNetworkStatusChange: true,
        context: { clientName: 'gateway' },
        fetchPolicy: 'no-cache',
        query: SearchDocument,
        variables: {
          input: newParameters,
        },
      });

      if (data.search.queryID) {
        set(() => ({
          queryID: data.search.queryID,
        }));
      }

      const { searchType } = getState();

      const trackStore = trackPageViewStore.getState();
      const trackClick = trackClickStore.getState();

      if (searchType === SearchType.SEARCH) {
        const type = data.search.count
          ? TrackPageTypeEnum.SearchWithResult
          : TrackPageTypeEnum.Search;

        const newData: IData = {
          productId: '',
          identifier: '',
        };

        trackClick.onTrackClick(newData, data.search.identifier || '', type);
        trackStore.onTrackPageView(data.search.identifier || '', type);
        EventProvider.logEvent('view_search_results', { search_term: String(newParameters.q) });


        const properties = new MoEProperties();
        properties.addAttribute('term', String(newParameters.q));
        ReactMoE.trackEvent('ProductSearched', properties);
      }

      if (searchType === SearchType.CATALOG) {
        trackStore.onTrackPageView(data.search.identifier || '', TrackPageTypeEnum.Category);

        EventProvider.logEvent('product_list_view', {
          content_type: 'product_group',
          item_brand: getBrandByUrl({ categoryTree: [{ href: data.search.items[0]?.category || '' }] }),
        });
      }

      set(() => ({
        loading: false,
        ...(filters ? { filters } : {}),
        result: data.search.items,
        resultCount: data.search.count,
      } as ISearchStore));
    } catch (err) {
      ExceptionProvider.captureException(
        err,
        'onSearch - useSearchStore.ts',
        {
          parameters: (JSON.stringify(parameters) || ''),
          filters: (JSON.stringify(filters) || ''),
        },
      );
    }
  },
  doFetchMore: async () => {
    try {
      const client = getApolloClient();

      set(() => ({ loading: true, status: SearchStatusEnum.RESULT }));

      const state = getState();
      const newParameters = { ...state.parameters, page: state.parameters.page + 1 };

      const { data } = await client.query<SearchQuery, SearchQueryVariables>({
        notifyOnNetworkStatusChange: true,
        context: { clientName: 'gateway' },
        fetchPolicy: 'network-only',
        query: SearchDocument,
        variables: {
          input: newParameters,
        },
      });

      const resultCount = data.search.items.length ? data.search.count : 0;

      if (resultCount === 0 && state.result.length === 0) {
        set(() => ({
          loading: false,
          parameters: { ...state.parameters, page: 0 },
        } as ISearchStore));

        state.doFetchMore();
      }

      set(() => ({
        loading: false,
        parameters: newParameters,
        result: [...state.result, ...data.search.items],
        resultCount,
      } as ISearchStore));
    } catch (err) {
      ExceptionProvider.captureException(err, 'doFetchMore - useSearchStore.ts');
    }
  },
}));

export default createZustandStoreWithSelectors(useSearchStore);