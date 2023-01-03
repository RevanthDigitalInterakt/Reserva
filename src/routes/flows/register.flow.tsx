import { ConfirmAccessCode } from '../../modules/Register/pages/ConfirmAccessCode';
import { RegisterEmail } from '../../modules/Register/pages/RegisterEmail';
import { Flow } from '../types/flow.type';

export const RegisterFlow: Flow[] = [
  //   {
  //     component: ForgotNewPassword,
  //     name: 'ForgotNewPassword',
  //   },
  //   {
  //     component: ForgotPassword,
  //     name: 'ForgotPassword',
  //   },
  {
    component: RegisterEmail,
    name: 'RegisterEmail',
  },
  //   {
  //     component: ForgotEmailSuccess,
  //     name: 'ForgotEmailSuccess',
  //   },
  {
    component: ConfirmAccessCode,
    name: 'ConfirmAccessCode',
  },
];
