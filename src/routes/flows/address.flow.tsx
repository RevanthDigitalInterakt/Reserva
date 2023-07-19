import AddressList from '../../modules/Address/AddressList/view';
import NewAddress from '../../modules/Address/NewAddress/view/NewAddress';
import CreateAddress from '../../pages/Address/CreateAddress';
import type { Flow } from '../types/flow.type';

export const AddressFlow: Flow[] = [
  {
    component: CreateAddress,
    name: 'CreateAddress',
  },
  {
    component: NewAddress,
    name: 'NewAddress',
  },
  {
    component: AddressList,
    name: 'AddressList',
  },
];
