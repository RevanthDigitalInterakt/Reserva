import { create } from 'zustand';
import Config from 'react-native-config';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import { useBagStore } from './useBagStore/useBagStore';

interface IWishlistStore {
  dorisUrl: string;
  showAnimationBagDoris: boolean;
  setShowAnimationBagDoris: (show: boolean) => void
  setDorisUrl: (ean: string) => void;
}

const { orderFormId } = useBagStore(['orderFormId']);

const useDorisStore = create<IWishlistStore>((set) => ({
  dorisUrl: '',
  showAnimationBagDoris: false,
  setDorisUrl: (ean) => {
    set(() => ({
      dorisUrl: `${Config.DORIS_URL}?ean=${ean}&dwview=1&dwoa=1&dwskus=${ean}&dwappuser=${orderFormId}`,
    }));
  },
  setShowAnimationBagDoris: (show) => {
    set(() => ({
      showAnimationBagDoris: show,
    }));
  },
}));

export default createZustandStoreWithSelectors(useDorisStore);
