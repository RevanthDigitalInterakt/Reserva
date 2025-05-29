import NewAddressABTest from '../../modules/Address/NewAddress/NewAddressABTest';
import NewAddressListABTest from '../../modules/Address/AddressList/AddressListABTest';
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
    component: NewAddressListABTest,
    name: 'AddressList',
  },
];
