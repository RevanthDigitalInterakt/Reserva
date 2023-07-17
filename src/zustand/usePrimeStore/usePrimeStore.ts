import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

interface IPrimeStore {
  animationBag: boolean;
  isVisibleModalWelcome: boolean;
  isVisibleModalPrimeRemoved: boolean;
  handleClickContinue: () => void;
  changeStateAnimationBag: (state: boolean) => void;
  changeStateIsVisibleModalWelcome: (state: boolean) => void;
  changeStateIsVisibleModalPrimeRemoved: (state: boolean) => void;
}

export const primeStore = create<IPrimeStore>((_set, _getState) => ({
  animationBag: false,
  isVisibleModalWelcome: false,
  hasPrimeSubscriptionInCart: false,
  isVisibleModalPrimeRemoved: false,
  changeStateIsVisibleModalPrimeRemoved: (state) => {
    _set({ isVisibleModalPrimeRemoved: state });
  },
  changeStateAnimationBag: (state) => {
    _set({ animationBag: state });
  },
  changeStateIsVisibleModalWelcome: (state) => {
    _set({ isVisibleModalWelcome: state });
  },
  handleClickContinue: () => {
    _set({ isVisibleModalWelcome: false });
  },
}));

export const usePrimeStore = createZustandStoreWithSelectors(primeStore);
