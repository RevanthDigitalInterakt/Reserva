import type { IFallBackRoute, TActionType } from '../../types/asyncDeepLinkStore';
import { catalogService } from './services/Catalog/CatalogService';

const reducerMethods: Record<TActionType, (...args: any[]) => Promise<IFallBackRoute>> = {
  CATALOG: async (args) => {
    const { params, initialUrl } = args;
    return catalogService(params || '', `https://${initialUrl}` || '');
  },
};

export default reducerMethods;
