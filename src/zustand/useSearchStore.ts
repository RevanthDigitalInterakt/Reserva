import { create } from 'zustand';
import { Keyboard } from 'react-native';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import type {
  ProductListOutput, SearchProductInput, SearchQuery, SearchQueryVariables,
} from '../base/graphql/generated';
import { SearchDocument, SearchOrderByEnum } from '../base/graphql/generated';
import { getApolloClient } from '../utils/getApolloClient';
import { trackEventSearchDito } from '../utils/trackEventSearchDito';

export enum SearchStatusEnum {
  INITIAL,
  SUGGESTIONS,
  RESULT,
}

const RESULT_PER_PAGE = 12;

const initialData = {
  initialized: false,
  loading: false,
  status: SearchStatusEnum.INITIAL,
  resultCount: 0,
  result: [],
  parameters: {
    facets: [],
    page: 1,
    q: '',
    orderBy: SearchOrderByEnum.OrderByScoreDesc,
    perPage: RESULT_PER_PAGE,
    priceRange: null,
  },
};

interface ISearchStore {
  initialized: boolean,
  loading: boolean;
  status: SearchStatusEnum;
  parameters: Required<SearchProductInput>;
  resultCount: number;
  result: ProductListOutput[];
  onInit: () => void,
  setStatus: (status: SearchStatusEnum) => void;
  setQ: (s: string) => void;
  onSearch: (input: Partial<Omit<SearchProductInput, 'perPage'>>) => Promise<void>;
  doFetchMore: () => void;
}

const useSearchStore = create<ISearchStore>((set, getState) => ({
  initialized: false,
  loading: false,
  status: SearchStatusEnum.INITIAL,
  resultCount: 0,
  parameters: {
    q: '',
    page: 1,
    orderBy: SearchOrderByEnum.OrderByScoreDesc,
    facets: [],
    perPage: RESULT_PER_PAGE,
    priceRange: null,
  },
  result: [],
  onInit: () => set(() => ({ ...initialData, initialized: true })),
  setStatus: (status) => set(() => ({ status })),
  setQ: (q) => {
    const newParameters = { ...getState().parameters, q };
    set(() => ({ parameters: newParameters }));
  },
  onSearch: async (parameters) => {
    try {
      const client = getApolloClient();

      Keyboard.dismiss();

      const newParameters = { ...getState().parameters, ...parameters };

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
        fetchPolicy: 'network-only',
        query: SearchDocument,
        variables: { input: newParameters },
      });

      trackEventSearchDito(newParameters.q, data.search.count);

      set(() => ({
        loading: false,
        result: data.search.items,
        resultCount: data.search.count,
      }));
    } catch (err) {
      //
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

      trackEventSearchDito(newParameters.q, data.search.count);

      set(() => ({
        loading: false,
        parameters: newParameters,
        result: [...state.result, ...data.search.items],
        resultCount: data.search.count,
      }));
    } catch (err) {
      //
    }
  },
}));

export default createZustandStoreWithSelectors(useSearchStore);
