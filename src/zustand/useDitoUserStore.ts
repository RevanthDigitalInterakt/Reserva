import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

interface IUseDitoUserStore {
  setAnonymousID: (value: string) => void;
  anonymousID: string;
}

const useDitoUserStore = create<IUseDitoUserStore>((set) => ({
  anonymousID: '',
  setAnonymousID: (value: string) => set(() => ({ anonymousID: value })),
}));

export default createZustandStoreWithSelectors(useDitoUserStore);
