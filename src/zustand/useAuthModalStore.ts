import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

interface IAuthModalStore {
  showModalSignUpComplete: boolean;
  showModalCheckConnection: boolean;
  setModalSignUpComplete: (value: boolean) => void;
  setModalCheckConnection: (value: boolean) => void
}

const useAuthModalStore = create<IAuthModalStore>((set) => ({
  showModalSignUpComplete: false,
  showModalCheckConnection: false,
  setModalSignUpComplete: (value: boolean) => set(() => (
    { showModalSignUpComplete: value }
  )),
  setModalCheckConnection: (value: boolean) => set(() => (
    { showModalCheckConnection: value })),
}));

export default createZustandStoreWithSelectors(useAuthModalStore);
