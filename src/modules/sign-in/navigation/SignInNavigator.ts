import { LoginContainer } from '../screens/login/Login.container';

export enum SignInScreensRoutes {
  LOGIN = '@sign-in:login',
  ERROR = '@sign-in:error',
}

export type SignInParamList = {
  [SignInScreensRoutes.LOGIN]: undefined;
};

export const SignInRoutes = [
  {
    component: LoginContainer,
    name: SignInScreensRoutes.LOGIN,
  },
];
