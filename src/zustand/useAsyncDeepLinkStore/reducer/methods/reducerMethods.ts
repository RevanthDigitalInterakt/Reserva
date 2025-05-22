import type { IFallBackRoute, TActionType } from '../../types/asyncDeepLinkStore';
import { catalogService } from './services/CatalogService';
import { productService } from './services/ProductService';

const reducerMethods: Record<TActionType, (...args: any[]) => Promise<IFallBackRoute>> = {
  CATALOG: async (args) => {
    const { params, initialUrl } = args;
    return catalogService(params || '', `https://${initialUrl}` || '');
  },
  PRODUCT: async (args) => {
    const { initialUrl, skuId } = args;
    return productService(skuId || '', `https://${initialUrl}` || '');
  },
};

export default reducerMethods;
