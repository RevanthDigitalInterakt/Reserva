import { ConfirmAccessCode } from '../../modules/Register/pages/ConfirmAccessCode';
import { RegisterEmail } from '../../modules/Register/pages/RegisterEmail';
import type { Flow } from '../types/flow.type';

export const RegisterFlow: Flow[] = [
  {
    component: RegisterEmail,
    name: 'RegisterEmail',
  },
  {
    component: ConfirmAccessCode,
    name: 'ConfirmAccessCode',
  },
];
