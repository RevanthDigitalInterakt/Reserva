// import AddressList from '../../modules/Address/AddressList/view';
import NewAddressABTest from '../../modules/Address/NewAddress/NewAddressABTest';
import NewAddressList from '../../pages/Address/ListAddress/ListAddress';
import type { Flow } from '../types/flow.type';

export const AddressFlow: Flow[] = [
  {
    component: NewAddressABTest,
    name: 'CreateAddress',
  },
  {
    component: NewAddressABTest,
    name: 'NewAddress',
  },
  {
    component: NewAddressList,
    name: 'AddressList',
  },
];
