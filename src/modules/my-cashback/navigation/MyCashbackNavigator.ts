import { MyWalletScreen } from '../screens/my-wallet/MyWallet.screen';

export enum MyCashbackScreensRoutes {
  MY_WALLET = 'MY_CASHBACK_MY_WALLET',
  ERROR = 'error',
}

export type MyCashbackParamList = {
  [MyCashbackScreensRoutes.MY_WALLET]: undefined;
  [MyCashbackScreensRoutes.ERROR]: undefined;
};

export const MyCashbackRoutes = [
  {
    component: MyWalletScreen,
    name: MyCashbackScreensRoutes.MY_WALLET,
  },
];
