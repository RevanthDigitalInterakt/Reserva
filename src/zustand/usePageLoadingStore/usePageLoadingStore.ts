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
  | 'MyWallet'
  | 'AddressList'
  | 'Search'
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
  'MyWallet',
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
  arrRoutes: string[] | [];
  onStartLoad: (page: string | undefined) => void;
  onFinishLoad: () => void;
  arrRoutesCheck: (page: TRoutes) => boolean;
}

const pageLoadingStore = create<ILoadingStore>((set, getState) => ({
  ...initialState,
  arrRoutes: [],
  arrRoutesCheck: (page) => {
    const state = getState();
    if (!page) return false;

    const arr: string[] = state.arrRoutes;
    const index = arr.indexOf(page);

    if (index !== -1) {
      arr.splice(index, 1);
      return false;
    }

    arr.push(page);
    return true;
  },
  onStartLoad: (page) => {
    const state = getState();
    if (!page) return;

    const pageFind = routesArray.includes(page as TRoutes);

    if (page === state.currentRoute || !pageFind) return;

    const verifyArrRoutes = state.arrRoutesCheck(page as TRoutes);

    if (verifyArrRoutes) {
      set(() => ({
        currentRoute: page,
        startLoadingTime: new Date().getTime(),
      }));
    }
  },
  onFinishLoad: () => {
    const state = getState();
    if (!state.currentRoute) return;

    const currTime = new Date().getTime();

    const timeElapsed = currTime - getState().startLoadingTime;

    if (timeElapsed) {
      const value = (timeElapsed / 100) / 10;
      try {
        EventProvider.logEvent('page_load_time', {
          page: state.currentRoute,
          value,
        });
      } catch (error) {
        ExceptionProvider.captureException(error);
      }
    }
    set(initialState);
  },
}));

export const usePageLoadingStore = createZustandStoreWithSelectors(pageLoadingStore);
