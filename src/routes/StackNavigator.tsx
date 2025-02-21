import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CallCenter from '../modules/CallCenter';
import { WebviewZendesk } from '../modules/CallCenter/WebviewZendesk';
import { Cashback } from '../modules/Cashback/pages/Cashback';
import {
  CEPList,
  type CepsInfo,
  type SearchBy,
} from '../modules/ChangeRegionalization/pages/CEPList';
import { ChangeRegionalization } from '../modules/ChangeRegionalization/pages/ChangeRegionalization';
import { Credits } from '../modules/Credits/pages/Credits';
import { AccountDeletedSuccessfully } from '../modules/Profile/pages/AccountDeletedSuccessfully';
import { EditPassword } from '../modules/Profile/pages/EditPassword';
import { MyCashbackRoutes } from '../modules/my-cashback/navigation/MyCashbackNavigator';
import { MyCreditsRoutes } from '../modules/my-credits/navigation/MyCreditsNavigator';
import NewBag from '../pages/Bag/NewBag';
import EditProfile from '../pages/EditProfile/EditProfile';
import PrimeLP from '../pages/PrimeLP';
import PageOneP5P from '../pages/PageOneP5P/PageOneP5P';
import RonRedirectToBag from '../pages/RonRedirectToBag';
import NewSearch from '../pages/Search';
import { AsyncDeepLinkScreenLoading } from '../pages/WebRedirectToCatalog/AsyncDeepLinkScreenLoading';
import WebviewCheckout from '../pages/WebviewCheckout/WebviewCheckout';
import type { IFilters } from '../utils/generateFacets';
import { HomeTabs } from './HomeTabs';
import {
  AddressFlow,
  ForgotFlow,
  LoginFlow,
  OrderFlow,
  ProductFlow,
  RegisterFlow,
} from './flows';
import type { Flow } from './types/flow.type';
import ZipCodeDelivery from '../pages/ZipCodeDelivery';
import WebViewDoris from '../pages/WebViewDoris';
import WebViewFacaVoce from '../pages/WebViewFacaVoce';
import Newsletter from '../pages/Newsletter/Newsletter';
import PageHelpCenter from '../pages/HelpCenter/Components/PageHelpCenter';
import Exchange from '../pages/HelpCenter/pages/Exchange/Exchange';
import type { SessionBodyCollectionOutput } from '../base/graphql/generated';
import HelpCenter from '../pages/HelpCenter';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ExchangeScreen from '../pages/Exchange/Exchange';
import NewForgotAccessCode from '../pages/NewForgotAccessCode/NewForgotAccessCode';
import NewForgotNewPassword from '../pages/NewForgotNewPassword/NewForgotNewPassword';
import NewForgotSuccess from '../pages/NewForgotSuccess/NewForgotSuccess';

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
  FacaVc: undefined;
  PageOneP5P: { comeFrom?: 'Menu' | 'Home' };
  Newsletter: {
    headerImageUrl?: string;
  };
  HelpCenter: { comeFrom?: 'Menu' | 'Other' };
  Checkout: { url: string };
  RegisterSuccess: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' };
  LoginAlternative: {
    comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' | 'BagScreen',
    previousPage?: keyof RootStackParamList;
    invalidSession?: boolean;
  };
  Login: {
    comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' | 'BagScreen'
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
  NewForgotPassword: {};
  NewForgotAccessCode: { username: string, cookies?: string[] };
  NewForgotNewPassword: { code: string; email: string, cookies: string[] };
  NewForgotSuccess: {};
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
  },
  ZipCodeDelivery: undefined;
  PageHelpCenter: {
    title?: string;
    data?: SessionBodyCollectionOutput['items'];
  },
  Exchange: {
    url?: string;
  },
  ExchangeScreen: undefined;
};

const flows: Flow[] = [
  ...AddressFlow,
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
        <MainStack.Screen key={`${flow.name}`} name={flow.name} component={flow.component} initialParams={flow.initialParams} />
      ))}

      <MainStack.Screen name="ChangeRegionalization" component={ChangeRegionalization} />
      <MainStack.Screen name="SearchMenu" component={NewSearch} />
      <MainStack.Screen name="CEPList" component={CEPList} />
      <MainStack.Screen name="RonRedirectToBag" component={RonRedirectToBag} />
      <MainStack.Screen name="AsyncDeepLink" component={AsyncDeepLinkScreenLoading} />
      <MainStack.Screen name="BagScreen" component={NewBag} initialParams={{ isProfileComplete: false }} />
      <MainStack.Screen name="ZipCodeDelivery" component={ZipCodeDelivery} />
      <MainStack.Screen name="Checkout" component={WebviewCheckout} />
      <MainStack.Screen name="Doris" component={WebViewDoris} />
      <MainStack.Screen name="FacaVc" component={WebViewFacaVoce} />
      <MainStack.Screen name="Cashback" component={Cashback} />
      <MainStack.Screen name="Credits" component={Credits} />
      <MainStack.Screen name="EditProfile" component={EditProfile} />
      <MainStack.Screen name="EditPassword" component={EditPassword} />
      <MainStack.Screen name="AccountDeletedSuccessfully" component={AccountDeletedSuccessfully} />
      <MainStack.Screen name="CallCenter" component={CallCenter} />
      <MainStack.Screen name="WebviewZendesk" component={WebviewZendesk} />
      <MainStack.Screen name="PrimeLP" component={PrimeLP} />
      <MainStack.Screen name="PageOneP5P" component={PageOneP5P} />
      <MainStack.Screen name="Newsletter" component={Newsletter} />
      <MainStack.Screen name="HelpCenter" component={HelpCenter} />
      <MainStack.Screen name="PageHelpCenter" component={PageHelpCenter} />
      <MainStack.Screen name="Exchange" component={Exchange} />
      <MainStack.Screen name="ExchangeScreen" component={ExchangeScreen} />
      <MainStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <MainStack.Screen name="NewForgotAccessCode" component={NewForgotAccessCode} />
      <MainStack.Screen name="NewForgotNewPassword" component={NewForgotNewPassword} />
      <MainStack.Screen name="NewForgotSuccess" component={NewForgotSuccess} />
    </MainStack.Navigator>
  );
}
