import OrderCancel from '../../modules/Order/pages/OrderCancel';
import OrderDetail from '../../modules/Order/pages/OrderDetail';
import OrderList from '../../modules/Order/pages/OrderList';
import { Flow } from '../types/flow.type';

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
