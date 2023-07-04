import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

interface IProductCatalogStore {
  facets: string;
  setFacets: (value: string) => void;
}

const productCatalogStore = create<IProductCatalogStore>((set) => ({
  facets: '',
  setFacets: (value: string) => set(() => (
    { facets: value }
  )),
}));

export const useProductCatalogStore = createZustandStoreWithSelectors(productCatalogStore);
