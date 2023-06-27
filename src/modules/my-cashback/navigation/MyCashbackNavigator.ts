import { MyWalletScreen } from '../screens/my-wallet/MyWallet.screen';

export enum MyCashbackScreensRoutes {
  MY_WALLET = 'MY_CASHBACK_MY_WALLET',
}

export const MyCashbackRoutes = [
  {
    component: MyWalletScreen,
    name: MyCashbackScreensRoutes.MY_WALLET,
  },
];
