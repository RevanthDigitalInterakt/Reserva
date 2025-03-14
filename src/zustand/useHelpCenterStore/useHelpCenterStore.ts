import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import { getApolloClient } from '../../utils/getApolloClient';
import {
  HelpCenterCollectionDocument,
  type HelpCenterCollectionQuery,
  type HelpCenterCollectionQueryVariables,
  type HelpCenterCollectionsItemsOutput,
  type ItemsHelpCenterCollectionOutput,
} from '../../base/graphql/generated';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

type TState = {
  titleHelpCenter: HelpCenterCollectionsItemsOutput['titleHelpCenter'];
  footerHelpCenter: HelpCenterCollectionsItemsOutput['footerHelpCenter'];
  itemsHelpCenter: ItemsHelpCenterCollectionOutput['items']
  initialized: boolean;
  loading: boolean;
};

const initialState: TState = {
  footerHelpCenter: {},
  titleHelpCenter: '',
  itemsHelpCenter: [],
  initialized: false,
  loading: false,
};

interface IHelpCenterStore {
  titleHelpCenter?: HelpCenterCollectionsItemsOutput['titleHelpCenter'];
  footerHelpCenter?: HelpCenterCollectionsItemsOutput['footerHelpCenter'];
  itemsHelpCenter?: ItemsHelpCenterCollectionOutput['items'];
  loading: boolean;
  initialized: boolean;
  actions: {
    INITIAL_LOADING: () => Promise<void>
    SET_DATA: (data: HelpCenterCollectionQuery['helpCenterCollection']) => Promise<void>
  }
}

const helpCenterStore = create<IHelpCenterStore>((set, getState) => ({
  ...initialState,
  actions: {
    INITIAL_LOADING: async () => {
      try {
        if (getState().initialized) return;

        set(() => ({ loading: true }));

        const { data } = await getApolloClient().query<HelpCenterCollectionQuery,
        HelpCenterCollectionQueryVariables>({
          query: HelpCenterCollectionDocument,
          fetchPolicy: 'no-cache',
          context: { clientName: 'gateway' },
        });

        if (!data) return;

        const { items } = data.helpCenterCollection;

        const titleHelpCenter = items?.map((x) => x?.titleHelpCenter);
        const footerHelpCenter = items?.map((x) => x?.footerHelpCenter);
        const itemsHelpCenter = items?.map((x) => x?.itemsHelpCenterCollection?.items);

        if (!titleHelpCenter || !footerHelpCenter || !itemsHelpCenter) return;

        set(() => ({
          titleHelpCenter: titleHelpCenter[0],
          footerHelpCenter: footerHelpCenter[0],
          itemsHelpCenter: itemsHelpCenter[0],
        }));
      } catch (error) {
        ExceptionProvider.captureException(error, 'INITIAL_LOADING - useHelpCenter.ts');
      } finally {
        set(() => ({ loading: false, initialized: true }));
      }
    },
    SET_DATA: async (data: HelpCenterCollectionQuery['helpCenterCollection']) => {
      try {
        set(() => ({ loading: true }));

        const titleHelpCenter = data.items?.map((x) => x?.titleHelpCenter);
        const footerHelpCenter = data.items?.map((x) => x?.footerHelpCenter);
        const itemsHelpCenter = data.items?.map((x) => x?.itemsHelpCenterCollection?.items);

        if (!titleHelpCenter || !footerHelpCenter || !itemsHelpCenter) return;

        set(() => ({
          titleHelpCenter: titleHelpCenter[0],
          footerHelpCenter: footerHelpCenter[0],
          itemsHelpCenter: itemsHelpCenter[0],
        }));
      } catch (error) {
        ExceptionProvider.captureException(error, 'SET_DATA - useHelpCenterStore.ts');
      } finally {
        set(() => ({ loading: false }));
      }
    },
  },
}));

export const useHelpCenterStore = createZustandStoreWithSelectors(helpCenterStore);
