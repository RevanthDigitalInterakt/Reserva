import { CreditsScreen } from "../screens/credits/Credits.screen";

export enum MyCreditsScreensRoutes {
  CREDITS = 'credits',
  ERROR = 'error',
  CASHBACK_IN_STORE = 'cashbackInStore',
}

export const MyCreditsRoutes = [
  {
    component: CreditsScreen,
    name: MyCreditsScreensRoutes.CREDITS,
  }
];
