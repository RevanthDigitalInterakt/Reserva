import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import EventProvider from '../../utils/EventProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

type TRoutes =
  | 'Home'
  | 'ProductDetail'
  | 'ProductCatalog'
  | 'BagScreen'
  | 'DeliveryScreen'
  | 'WishList'
  | 'OrderList'
  | 'EditProfile'
  | 'MyWallet'
  | 'AddressList'
  | 'Search'
  | 'Login';

type TState = {
  currentRoute?: TRoutes;
  startLoadingTime: number;
};

const initialState: TState = {
  currentRoute: undefined,
  startLoadingTime: 0,
};

export interface ILoadingStore {
  currentRoute?: TRoutes;
  startLoadingTime: number;
  onStartLoad: (page: TRoutes) => void;
  onFinishLoad: () => void;
}

const pageLoadingStore = create<ILoadingStore>((set, getState) => ({
  ...initialState,
  onStartLoad: (page) => {
    if (page === getState().currentRoute) return;

    set(() => ({
      currentRoute: page,
      startLoadingTime: new Date().getTime(),
    }));
  },
  onFinishLoad: () => {
    const state = getState();
    if (!state.currentRoute) return;

    const currTime = new Date().getTime();

    const timeElapsed = currTime - getState().startLoadingTime;

    if (timeElapsed) {
      try {
        EventProvider.logEvent('page_load_time', {
          page: state.currentRoute,
          loading_time: timeElapsed,
        });
      } catch (error) {
        ExceptionProvider.captureException(error);
      }
    }
    set(initialState);
  },
}));

export const usePageLoadingStore = createZustandStoreWithSelectors(pageLoadingStore);
