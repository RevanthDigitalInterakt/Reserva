import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import EventProvider from '../../utils/EventProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

type TRoutes =
  | 'Home'
  | 'ProductDetail'
  | 'ProductCatalog'
  | 'BagScreen'
  | 'NewBag'
  | 'DeliveryScreen'
  | 'WishList'
  | 'OrderList'
  | 'EditProfile'
  | 'MY_CASHBACK_MY_WALLET'
  | 'AddressList'
  | 'Search'
  | 'Offers'
  | 'Login';

const routesArray: (TRoutes | undefined)[] = [
  'Home',
  'ProductDetail',
  'ProductCatalog',
  'BagScreen',
  'NewBag',
  'DeliveryScreen',
  'WishList',
  'OrderList',
  'EditProfile',
  'MY_CASHBACK_MY_WALLET',
  'Offers',
  'AddressList',
  'Search',
  'Login',
  undefined,
];

type TState = {
  currentRoute: string | undefined;
  startLoadingTime: number;
};

const initialState: TState = {
  currentRoute: undefined,
  startLoadingTime: 0,
};

export interface ILoadingStore {
  currentRoute: string | undefined;
  startLoadingTime: number;
  onStartLoad: (page: string | undefined) => void;
  onFinishLoad: () => void;
}

const pageLoadingStore = create<ILoadingStore>((set, getState) => ({
  ...initialState,
  onStartLoad: (page) => {
    const state = getState();
    if (!page) return;

    const pageFind = routesArray.includes(page as TRoutes);

    if (page === state.currentRoute || !pageFind) return;

    set(() => ({
      currentRoute: page,
      startLoadingTime: new Date().getTime(),
    }));
  },
  onFinishLoad: () => {
    const state = getState();
    if (!state.startLoadingTime) return;

    const currTime = new Date().getTime();

    const timeElapsed = currTime - getState().startLoadingTime;

    if (timeElapsed && state.currentRoute) {
      const value = timeElapsed / 1000;
      try {
        EventProvider.logEvent('page_load_time', {
          page: state.currentRoute,
          value,
        });
      } catch (error) {
        ExceptionProvider.captureException(error, "onFinishLoad - usePageLoadingStore.ts");
      }
    }
    set(initialState);
  },
}));

export const usePageLoadingStore = createZustandStoreWithSelectors(pageLoadingStore);
