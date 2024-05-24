import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';
import Config from 'react-native-config';
import { v4 } from 'uuid';

interface IWishlistStore {
  dorisUrl: string;
  setDorisUrl: (ean: string) => void;
}

const useDorisStore = create<IWishlistStore>((set) => ({

  dorisUrl: '',
  setDorisUrl: (ean) => {
    set(() => ({
      dorisUrl: `${Config.DORIS_URL}?ean=${ean}&dwview=1&dwoa=1&dwskus=${ean}&dwappuser=${v4()}`
    }))
  }
}));

export default createZustandStoreWithSelectors(useDorisStore);
