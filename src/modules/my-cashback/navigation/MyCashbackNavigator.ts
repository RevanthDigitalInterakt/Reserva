import { MyWalletView } from '../screens/my-wallet/MyWallet.view';

export enum MyCashbackScreensRoutes {
  MY_WALLET = 'myWallet',
  ERROR = 'error',
}

export type MyCashbackParamList = {
  [MyCashbackScreensRoutes.MY_WALLET]: undefined;
  [MyCashbackScreensRoutes.ERROR]: undefined;
};

export const MyCashbackRoutes = [
  {
    component: MyWalletView,
    name: MyCashbackScreensRoutes.MY_WALLET,
  },
];
