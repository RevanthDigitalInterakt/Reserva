import { CashbackInStoreScreen } from "../screens/cashback-in-store/CashbackInStore.screen";
import { CreditsScreen } from "../screens/credits/Credits.screen";
import { RegisterPhoneNumber } from "../screens/Register-phone-number/RegisterPhoneNumber";
import { ChangePhoneNumber } from "../screens/Register-phone-number/ChangePhoneNumber";

export enum MyCreditsScreensRoutes {
  CREDITS = 'credits',
  ERROR = 'error',
  CASHBACK_IN_STORE = 'cashbackInStore',
  REGISTER_PHONE_NUMBER = 'registerPhoneNumber',
  CHANGE_PHONE_NUMBER = 'changePhoneNumber',
}

export type MyCreditsParamList = {
  [MyCreditsScreensRoutes.CREDITS]: undefined;
  [MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER]: undefined;
  [MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER]: undefined;
  [MyCreditsScreensRoutes.CASHBACK_IN_STORE]: {
    isLoyal: boolean;
    costumerDocument: string;
    profile: string;
  };
};

export const MyCreditsRoutes = [
  {
    component: CreditsScreen,
    name: MyCreditsScreensRoutes.CREDITS,
  },
  {
    component: CashbackInStoreScreen,
    name: MyCreditsScreensRoutes.CASHBACK_IN_STORE,
  },
  {
    component: RegisterPhoneNumber,
    name: MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER,
  },
  {
    component: ChangePhoneNumber,
    name: MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER,
  }
];
