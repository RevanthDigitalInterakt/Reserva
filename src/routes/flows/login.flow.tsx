import { LoginScreen } from '../../modules/Login/pages/Login';
import SignIn from '../../pages/SignIn/SignIn';
import type { Flow } from '../types/flow.type';

export const LoginFlow: Flow[] = [
  {
    component: SignIn,
    name: 'Login',
  },
];
