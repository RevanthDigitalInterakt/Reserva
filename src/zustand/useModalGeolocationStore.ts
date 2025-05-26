import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../utils/createZustandStoreWithSelectors';

interface IModalGeolocationStore {
  showModalGeolocation: boolean;
  modalGeolocationController: (value: boolean) => void;
}

const useModalGeolocationStore = create<IModalGeolocationStore>((set) => ({
  showModalGeolocation: false,
  modalGeolocationController: (value: boolean) => set(() => (
    { showModalGeolocation: value }
  )),
}));

export default createZustandStoreWithSelectors(useModalGeolocationStore);
