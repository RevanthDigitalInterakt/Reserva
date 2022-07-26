import { CashbackInStoreScreen } from "../screens/cashback-in-store/CashbackInStore.screen";
import { CreditsScreen } from "../screens/credits/Credits.screen";
import { RegisterPhoneNumberScreen } from "../screens/Register-phone-number/RegisterPhoneNumber.screen";
import { ChangePhoneNumberScreen } from "../screens/Register-phone-number/ChangePhoneNumber.screen";
import { NumberRegisteredSuccessfully } from "../screens/Register-phone-number/NumberRegisteredSuccessfully";

import {
  ProfileVars,
} from '../../../graphql/profile/profileQuery';
export enum MyCreditsScreensRoutes {
  CREDITS = 'credits',
  ERROR = 'error',
  CASHBACK_IN_STORE = 'cashbackInStore',
  REGISTER_PHONE_NUMBER = 'registerPhoneNumber',
  CHANGE_PHONE_NUMBER = 'changePhoneNumber',
  NUMBER_REGISTERED_SUCCESSFULLY = 'numberRegisteredSuccessfully',
}

export type MyCreditsParamList = {
  [MyCreditsScreensRoutes.CREDITS]: undefined;
  [MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER]: {
    isChangeNumber?: boolean;
    profile: ProfileVars;
  };
  [MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER]: {
    profile: ProfileVars;
  };
  [MyCreditsScreensRoutes.NUMBER_REGISTERED_SUCCESSFULLY]: {
    profile: ProfileVars;
  };
  [MyCreditsScreensRoutes.CASHBACK_IN_STORE]: {
    isLoyal: boolean;
    costumerDocument: string;
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
    component: RegisterPhoneNumberScreen,
    name: MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER,
  },
  {
    component: ChangePhoneNumberScreen,
    name: MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER,
  },
  {
    component: NumberRegisteredSuccessfully,
    name: MyCreditsScreensRoutes.NUMBER_REGISTERED_SUCCESSFULLY,
  }
];
