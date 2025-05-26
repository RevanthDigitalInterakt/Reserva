import { create } from 'zustand';
import type { IAsyncDeepLinkStore, IPayloadDispatch } from './types/asyncDeepLinkStore';
import reducer from './reducer/asyncDeepLinkReducer';

const useAsyncDeepLinkStore = create<IAsyncDeepLinkStore>((set, getState): IAsyncDeepLinkStore => ({
  deepLinkLoading: true,
  fallBackRoute: null,
  dispatch: async (payload:IPayloadDispatch) => {
    set({ ...(await reducer(getState(), payload)) });
  },
}));

export default useAsyncDeepLinkStore;
