import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CallCenter from '../modules/CallCenter';
import { WebviewZendesk } from '../modules/CallCenter/WebviewZendesk';
import { ChangeRegionalization } from '../modules/ChangeRegionalization/pages/ChangeRegionalization';
import { DeliveryScreen } from '../modules/Checkout/pages/Delivery';
import { MapScreen } from '../modules/Checkout/pages/Map';
import Checkout from '../modules/Checkout/pages/WebviewCheckout';
import { WithdrawInStore } from '../modules/Checkout/pages/WithdrawInStore';
import { Credits } from '../modules/Credits/pages/Credits';
import { MyCashbackRoutes } from '../modules/my-cashback/navigation/MyCashbackNavigator';
import { MyCreditsRoutes } from '../modules/my-credits/navigation/MyCreditsNavigator';
import { EditPassword } from '../modules/Profile/pages/EditPassword';
import {
  CEPList,
  CepsInfo,
  SearchBy,
} from '../modules/ChangeRegionalization/pages/CEPList';
import { AccountDeletedSuccessfully } from '../modules/Profile/pages/AccountDeletedSuccessfully';

// TODO refactor Dependency cycle
import { Cashback } from '../modules/Cashback/pages/Cashback';
import {
  AddressFlow,
  ForgotFlow,
  HelpCenterFLow,
  LoginFlow,
  OrderFlow,
  ProductFlow,
  RegisterFlow,
} from './flows';

import { HomeTabs } from './HomeTabs';
import type { Flow } from './types/flow.type';
import RonRedirectToBag from '../pages/RonRedirectToBag';
import EditProfile from '../pages/EditProfile/EditProfile';
import type { IFilters } from '../utils/generateFacets';
import { AsyncDeepLinkScreenLoading } from '../pages/WebRedirectToCatalog/AsyncDeepLinkScreenLoading';
import { BagABTest } from '../modules/Checkout/pages/BagABTest';
import PrimeLP from '../pages/PrimeLP';
import { SearchABTest } from '../modules/Search/pages/SearchABTest';

export type RootStackParamList = {
  SearchScreen: { searchterm?: string };
  ProductDetail: {
    productId?: string;
    colorSelected: string;
    sizeSelected: string;
    hasCep?: string;
    idsku?: string;
    skuId?: string;
    itemId?: string;
    selectedSize?: string;
    slug?: string;
  };
  PrimeLP: undefined;
  HelpCenter: { comeFrom?: 'Menu' | 'Other' };
  DeliveryScreen: { comeFrom: 'Checkout' | 'Login' };
  Checkout: undefined;
  RegisterSuccess: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' };
  LoginAlternative: {
    comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite',
    previousPage?: keyof RootStackParamList;
    invalidSession?: boolean;
  };
  Login: {
    comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite',
    previousPage?: keyof RootStackParamList;
    invalidSession?: boolean;
  };
  ProductCatalog: {
    safeArea: boolean;
    search: boolean;
    referenceId: string;
    filters?: IFilters;
    indexMenuOpened?: number;
    comeFrom?: 'Menu' | 'Other';
  };
  Menu: {
    indexMenuOpened?: number;
  };
  ChangeRegionalization: {
    isCepAddress?: boolean;
    isCepProductDetail?: boolean;
  };
  CEPList: {
    list: CepsInfo;
    searchBy: SearchBy;
  };
  WishList: {};
  OrderDetail: {
    orderId?: string;
  };
  ForgotAccessCode: { email: string; cookies: string[]; };
  ConfirmAccessCode: { email: string };
  AccessCode: {
    email: string;
  };
  ForgotPassword: {} | undefined;
  ForgotNewPassword: { email: string; code: string };
  ForgotEmailSuccess: {} | undefined;

  CreateAddress: {
    id: string;
  } | undefined;

  NewAddress: {
    executeCallback: (payload: any) => Promise<void>;
    id?: number;
    edit?: boolean;
    hasCep?: string;
    editAddress?: {
      id: string;
      postalCode: string;
      state: string;
      city: string;
      street: string;
      district: string;
      number: string;
      complement: string;
      numberAndComplement: string[];
      firstName: string;
      phoneNumber: string;
      jobTitle: string;
      neighborhood: string;
      receiverName: string;
    };
  };
  ForgotEmail: {};
  RegisterEmail: {};
  EditProfile: { isRegister: boolean };
  Home: undefined;
  HomeTabs: undefined;
  Cashback: { isAcceptedConditions: boolean };
  Credits: {};
  AddressList: {};
  EditPassword: {
    email: string;
  };
  MapScreen: { geolocation: string; locationPermission: boolean };
  BagScreen: {
    isProfileComplete: boolean;
    orderFormId: string | undefined;
  };
  RonRedirectToBag: {
    ronCode: string;
  };
  AsyncDeepLink: {
    reducerKey: string;
  }
  WebViewDeepLink: {
    uri: string
  }
};

const flows: Flow[] = [
  ...AddressFlow,
  ...HelpCenterFLow,
  ...ForgotFlow,
  ...OrderFlow,
  ...LoginFlow,
  ...ProductFlow,
  ...MyCreditsRoutes,
  ...RegisterFlow,
  ...MyCashbackRoutes,
];

export const MainStack = createStackNavigator();

export function MainStackScreen() {
  return (
    <MainStack.Navigator
      detachInactiveScreens
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="HomeTabs" component={HomeTabs} />

      {flows.map((flow: Flow) => (
        <MainStack.Screen
          key={`${flow.name}`}
          name={flow.name}
          component={flow.component}
          initialParams={flow.initialParams}
        />
      ))}
      <MainStack.Screen name="SearchMenu" component={SearchABTest} />
      <MainStack.Screen
        name="ChangeRegionalization"
        component={ChangeRegionalization}
      />
      <MainStack.Screen name="CEPList" component={CEPList} />
      <MainStack.Screen name="RonRedirectToBag" component={RonRedirectToBag} />
      <MainStack.Screen name="AsyncDeepLink" component={AsyncDeepLinkScreenLoading} />

      <MainStack.Screen
        name="BagScreen"
        component={BagABTest}
        initialParams={{ isProfileComplete: false }}
      />

      <MainStack.Screen name="DeliveryScreen" component={DeliveryScreen} />
      <MainStack.Screen name="Checkout" component={Checkout} />
      <MainStack.Screen name="WithdrawInStore" component={WithdrawInStore} />
      <MainStack.Screen name="MapScreen" component={MapScreen} />
      <MainStack.Screen name="Cashback" component={Cashback} />
      <MainStack.Screen name="Credits" component={Credits} />
      <MainStack.Screen name="EditProfile" component={EditProfile} />
      <MainStack.Screen name="EditPassword" component={EditPassword} />

      <MainStack.Screen
        name="AccountDeletedSuccessfully"
        component={AccountDeletedSuccessfully}
      />

      <MainStack.Screen name="CallCenter" component={CallCenter} />
      <MainStack.Screen name="WebviewZendesk" component={WebviewZendesk} />

      <MainStack.Screen name="PrimeLP" component={PrimeLP} />
    </MainStack.Navigator>
  );
}
