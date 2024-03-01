import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import type { IRsvProduct } from '../../pages/Home/components/HomeShowcase/HomeShowcase';

interface IShelfStore {
  onShowShelfProductDetails: (value: boolean) => void;
  onHideShelfProductDetails: (value: boolean) => void;
  onGetShelfItemData: (data: IRsvProduct) => void;
  showShelfDrawer: boolean;
  shelfItemData: IRsvProduct;
}

const shelfStore = create<IShelfStore>((set) => ({
  showShelfDrawer: false,
  shelfItemData: {
    brand: '',
    productName: '',
    productId: '',
    productLink: '',
    image: '',
    categoryTree: [''],
    flags: [],
    sku: [],
    prices: {
      listPrice: 0,
      salePrice: 0,
    },
  },
  onShowShelfProductDetails: (value) => set(() => ({ showShelfDrawer: value })),
  onHideShelfProductDetails: (value) => set(() => ({ showShelfDrawer: value })),
  onGetShelfItemData: (value) => {
    set(() => ({ shelfItemData: value }));
  },
}));

export const useShelfStore = createZustandStoreWithSelectors(shelfStore);
