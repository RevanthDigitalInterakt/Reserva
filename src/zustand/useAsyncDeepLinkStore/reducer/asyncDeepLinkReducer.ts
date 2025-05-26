import type { IAsyncDeepLinkStore, IPayloadDispatch } from '../types/asyncDeepLinkStore';
import reducerMethods from './methods/reducerMethods';

const reducer = async (
  state: IAsyncDeepLinkStore,
  { actionType, payload }: IPayloadDispatch,
): Promise<IAsyncDeepLinkStore> => {
  switch (actionType) {
    case 'CATALOG': {
      const navigateToRoute = await reducerMethods.CATALOG({ ...payload });
      return { ...state, fallBackRoute: navigateToRoute };
    }
    case 'PRODUCT': {
      const navigateToRoute = await reducerMethods.PRODUCT({ ...payload });
      return { ...state, fallBackRoute: navigateToRoute };
    }
    default:
      return { ...state, fallBackRoute: { routeName: 'HomeTabs' }, deepLinkLoading: true };
  }
};

export default reducer;
