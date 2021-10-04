import AddressList from '../../modules/Address/pages/AddressList';
import NewAddress from '../../modules/Address/pages/NewAddress';
import { Flow } from '../types/flow.type';

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
