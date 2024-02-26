import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

interface IShelfStore {
  onShowShelfProductDetails: (value: boolean) => void;
  showShelfDrawer: boolean;
}

const shelfStore = create<IShelfStore>((set) => ({
  showShelfDrawer: false,
  onShowShelfProductDetails: (value) => set(() => ({ showShelfDrawer: value })),
}));

export const useShelfStore = createZustandStoreWithSelectors(shelfStore);
