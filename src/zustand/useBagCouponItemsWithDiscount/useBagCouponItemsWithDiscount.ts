import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

export type TProductData = {
  id: string;
  productName: string;
};

interface IBagCouponItemsWithDiscount {
  showModalItems: boolean;
  setShowModalItems: (state: boolean) => void;
}

export const bagCouponItemsWithDiscount = create<IBagCouponItemsWithDiscount>((_set) => ({
  showModalItems: false,
  setShowModalItems: (state) => {
    _set({ showModalItems: state });
  },
}));

export const
  useBagCouponItemsWithDiscount = createZustandStoreWithSelectors(bagCouponItemsWithDiscount);
