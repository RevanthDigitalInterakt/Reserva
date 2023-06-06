import { ProductCatalog } from '../../modules/ProductCatalog/pages/productCatalog/ProductCatalog';
import ProductDetail from '../../pages/ProductDetail';
import type { Flow } from '../types/flow.type';

export const ProductFlow: Flow[] = [
  {
    component: ProductCatalog,
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
