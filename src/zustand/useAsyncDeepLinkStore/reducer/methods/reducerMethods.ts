import type { IFallBackRoute, TActionType } from '../../types/asyncDeepLinkStore';
import { catalogService } from './services/Catalog/CatalogService';
import { productService } from './services/Product/ProductService';

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
