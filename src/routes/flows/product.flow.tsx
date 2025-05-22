import ProductDetail from '../../pages/ProductDetail';
import type { Flow } from '../types/flow.type';
import NewProductCatalog from '../../pages/ProductCatalog';

export const ProductFlow: Flow[] = [
  {
    component: NewProductCatalog,
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
