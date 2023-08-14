import { ProductCatalogABTest } from '../../modules/ProductCatalog/pages/productCatalog/ProductCatalogABTest';
import ProductDetail from '../../pages/ProductDetail';
import type { Flow } from '../types/flow.type';

export const ProductFlow: Flow[] = [
  {
    component: ProductCatalogABTest,
    name: 'ProductCatalog',
    initialParams: {
      safeArea: true,
      search: false,
    },
  },
  {
    component: ProductDetail,
    name: 'ProductDetail',
  },
];
