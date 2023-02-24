import { create } from 'zustand';

export interface IMarketPlaceInd {
  mktinActive: boolean;
  sellersMktIn: string[];
  setMktinActive: (value: boolean) => void;
  setSellersMktIn: (value: string[]) => void;

}

const useMarketPlaceInd = create<IMarketPlaceInd>((set) => ({
  mktinActive: false,
  sellersMktIn: [],
  setMktinActive: (value: boolean) => set(() => ({ mktinActive: value })),
  setSellersMktIn: (value: string[]) => set(() => ({ sellersMktIn: value })),
}));

export default useMarketPlaceInd;
