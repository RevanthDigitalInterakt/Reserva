import AccessCode from '../../modules/Login/pages/AccessCode';
import { LoginScreen } from '../../modules/Login/pages/Login';
import { Flow } from '../types/flow.type';

export const LoginFlow: Flow[] = [
  {
    component: LoginScreen,
    name: 'Login',
  },
  {
    component: AccessCode,
    name: 'AccessCode',
  },
];
