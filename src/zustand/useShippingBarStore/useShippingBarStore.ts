import { create } from 'zustand';

type ShippingBarState = {
  sumPrice: number;
  loadingBar: boolean;
  isFreeShipping: boolean;
  freeShippingValue: number;
  valueProgressBar: number;
  setSumPrice: (value: number) => void;
  setLoadingBar: (value: boolean) => void;
  setIsFreeShipping: (value: boolean) => void;
  setValueProgressBar: (value: number) => void;
  setFreeShippingValue: (value: number) => void;
};

export const useShippingBarStore = create<ShippingBarState>((set) => ({
  sumPrice: 0,
  loadingBar: false,
  isFreeShipping: false,
  valueProgressBar: 0,
  freeShippingValue: 0,
  setSumPrice: (value) => set(() => ({ sumPrice: value })),
  setLoadingBar: (value) => set(() => ({ loadingBar: value })),
  setIsFreeShipping: (value) => set(() => ({ isFreeShipping: value })),
  setValueProgressBar: (value) => set(() => ({ valueProgressBar: value })),
  setFreeShippingValue: (value) => set(() => ({ freeShippingValue: value })),
}));
