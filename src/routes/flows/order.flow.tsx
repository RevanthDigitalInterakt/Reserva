import OrderCancel from '../../pages/Order/pages/OrderCancel';
import OrderDetail from '../../pages/Order/pages/OrderDetail';
import OrderList from '../../pages/Order/pages/OrderList';
import type { Flow } from '../types/flow.type';

export const OrderFlow: Flow[] = [
  {
    component: OrderList,
    name: 'OrderList',
  },
  {
    component: OrderDetail,
    name: 'OrderDetail',
  },
  {
    component: OrderCancel,
    name: 'OrderCancel',
  },
];
