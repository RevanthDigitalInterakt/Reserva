import AddressList from '../../modules/Address/AddressList/view';
import NewAddress from '../../modules/Address/NewAddress/view/NewAddress';
import type { Flow } from '../types/flow.type';

export const AddressFlow: Flow[] = [
  {
    component: NewAddress,
    name: 'NewAddress',
  },
  {
    component: AddressList,
    name: 'AddressList',
  },
];
