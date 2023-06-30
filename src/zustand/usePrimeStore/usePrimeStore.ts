import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

interface IPrimeStore {
  isPrime: boolean;
}

export const primeStore = create<IPrimeStore>((_set, _getState) => ({
  isPrime: false,
}));

export const usePrimeStore = createZustandStoreWithSelectors(primeStore);
