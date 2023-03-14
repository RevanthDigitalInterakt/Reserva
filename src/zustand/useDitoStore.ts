import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface IDitoAuthStore {
  isLogged: boolean;
  hasHydrated: boolean;
  setIsLogged: (value: boolean) => void;
  setHasHydrated:(value: boolean) => void;
}

const useDitoStore = create<IDitoAuthStore>()(
  persist((set) => ({
    isLogged: false,
    hasHydrated: false,
    setIsLogged: (value: boolean) => set(() => ({ isLogged: value })),
    setHasHydrated: (state) => {
      set({
        hasHydrated: state,
      });
    },
  }),
  {
    name: 'dito-storage',
    storage: createJSONStorage(() => AsyncStorage),
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    },
  }),
);

export default useDitoStore;
