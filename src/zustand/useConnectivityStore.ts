import { create } from 'zustand';
import NetInfo from '@react-native-community/netinfo';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

interface IWishlistStore {
  isConnected: boolean;
  onListenEvents: () => void;
}

const connectivityStore = create<IWishlistStore>((set) => ({
  isConnected: false,
  onListenEvents: () => {
    NetInfo.addEventListener((state) => {
      set({ isConnected: !!state?.isConnected });
    });
  },
}));

export const useConnectivityStore = createZustandStoreWithSelectors(connectivityStore);
