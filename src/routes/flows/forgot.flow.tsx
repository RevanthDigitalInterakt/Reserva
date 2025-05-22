import { ForgotAccessCode } from '../../modules/Forgot/pages/ForgotAccessCode';
import { ForgotEmail } from '../../modules/Forgot/pages/ForgotEmail';
import { ForgotEmailSuccess } from '../../modules/Forgot/pages/ForgotEmailSuccess';
import { ForgotNewPassword } from '../../modules/Forgot/pages/ForgotNewPassword';
import { ForgotPassword } from '../../modules/Forgot/pages/ForgotPassword';
import type { Flow } from '../types/flow.type';

export const ForgotFlow: Flow[] = [
  {
    component: ForgotNewPassword,
    name: 'ForgotNewPassword',
  },
  {
    component: ForgotPassword,
    name: 'ForgotPassword',
  },
  {
    component: ForgotEmail,
    name: 'ForgotEmail',
  },
  {
    component: ForgotEmailSuccess,
    name: 'ForgotEmailSuccess',
  },
  {
    component: ForgotAccessCode,
    name: 'ForgotAccessCode',
  },
];
