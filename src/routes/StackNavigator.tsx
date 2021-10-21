// In App.js in a new project
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CallCenter from '../modules/CallCenter';
import { CancelOrder } from '../modules/CancelOrder/pages/CancelOrder';
import { Cashback } from '../modules/Cashback/pages/Cashback';
import { BagScreen } from '../modules/Checkout/pages/Bag';
import { BarCodePayment } from '../modules/Checkout/pages/BarCodePayment';
import { CreateCartProfile } from '../modules/Checkout/pages/CreateCartProfile';
import { DeliveryScreen } from '../modules/Checkout/pages/Delivery';
import { EnterYourEmail } from '../modules/Checkout/pages/EnterYourEmail';
import { GiftVoucherScreen } from '../modules/Checkout/pages/GiftVoucher';
import { MapScreen } from '../modules/Checkout/pages/Map';
import { NearbyStores } from '../modules/Checkout/pages/NearbyStores';
import { PaymentMethodScreen } from '../modules/Checkout/pages/PaymentMethod';
import { PixScreen } from '../modules/Checkout/pages/Pix';
import { PurchaseConfirmationScreen } from '../modules/Checkout/pages/PurchaseConfirmation';
import { SummaryScreen } from '../modules/Checkout/pages/Summary';
import { VirtualDebitCardCaixaScreen } from '../modules/Checkout/pages/VirtualDebitCardCaixa';
import Checkout from '../modules/Checkout/pages/WebviewCheckout';
import { WithdrawInStore } from '../modules/Checkout/pages/WithdrawInStore';
import { Credits } from '../modules/Credits/pages/Credits';
import { ExampleScreen } from '../modules/Example/pages/Example';
import { SizeGuide } from '../modules/HelpCenter/PagesHelp/SizeGuide';
import { WhatsappsHelp } from '../modules/HelpCenter/PagesHelp/WhatsappsHelp';
import { HomeScreen } from '../modules/Home/pages/Home';
import { IdentifyEmail } from '../modules/LoginCheckout/pages/IdentifyEmail';
import { EditPassword } from '../modules/Profile/pages/EditPassword';
// profile
import { EditProfile } from '../modules/Profile/pages/EditProfile';
import { ListCards } from '../modules/Profile/pages/ListCards';
import { NewCard } from '../modules/Profile/pages/NewCard';
import { NotificationProfile } from '../modules/Profile/pages/NotificationProfile';
import { Register } from '../modules/Register/pages/Register';
import { RegisterSuccess } from '../modules/Register/pages/RegisterSuccess';
import { SearchScreen } from '../modules/Search/pages/Search';
import { StoreUpdate } from '../modules/Update/pages/StoreUpdate';
import Update from '../modules/Update/pages/Update';
import { ShowListByCategory } from '../modules/WishList/pages/ShowListByCategory';
import { WishList } from '../modules/WishList/pages/WishList';
import { WishListCategory } from '../modules/WishList/pages/WishListCategory';

import {
  AddressFlow,
  ForgotFlow,
  HelpCenterFLow,
  LoginFlow,
  OrderFlow,
  ProductFlow,
} from './flows';
import { HomeTabs } from './HomeTabs';
import { Flow } from './types/flow.type';

export type RootStackParamList = {
  Register: {
    reset: Boolean;
    comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite';
  };
  SearchScreen: { searchterm?: string };
  ProductDetail: { productId: string; colorSelected: string };
  RegisterSuccess: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' };
  LoginAlternative: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' };
  Login: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' };
  ProductCatalog: {
    safeArea: boolean;
    search: boolean;
    referenceId: string;
    facetInput: [
      {
        key: string;
        value: string;
      }
    ];
  };
  WishList: {};
  OrderDetail: {
    orderId?: string;
  };
  ForgotAccessCode: { email: string };
  ShowListByCategory: { categoryName: string; products: any[] };
  IdentifyEmail: {};
  AccessCode: {
    email: string;
  };
  ForgotPassword: {} | undefined;
  ForgotNewPassword: { email: string; code: string };
  ForgotEmailSuccess: {} | undefined;
  NewAddress: {
    id?: number;
    isCheckout: boolean;
    edit?: boolean;
    editAddress: {
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
    };
  };
  ForgotEmail: {};
  Home: undefined;
  CancelOrder: {};
  Cashback: { credits: number };
  Credits: {};
  AddressList: { isCheckout: boolean; comeFrom: string };
  ListCards: {
    isCheckout: boolean;
    cashback: boolean;
  };
  EditPassword: {
    email: string;
  };
  StoreUpdate: {} | undefined;
  Update: {} | undefined;
  CreateCartProfile: {};
  NewCard: { isCheckout: boolean };
  NearbyStores: { UF: string };
  MapScreen: { geolocation: string; locationPermission: boolean };
  SummaryScreen: {
    paymentType:
    | 'PIX'
    | 'Credit'
    | 'Debit'
    | 'Boleto'
    | 'GiftCard'
    | 'Cashback';
    cashback: boolean;
  };
  PurchaseConfirmationScreen: {
    paymentType:
    | 'PIX'
    | 'Credit'
    | 'Debit'
    | 'Boleto'
    | 'GiftCard'
    | 'Cashback';
  };
  PixScreen: {
    cashback: boolean;
  };
  BarCodePayment: {
    cashback: boolean;
  };
  GiftVoucherScreen: {
    cashback: boolean;
  };
  VirtualDebitCardCaixaScreen: {
    cashback: boolean;
  };
};

const flows: Flow[] = [
  ...AddressFlow,
  ...HelpCenterFLow,
  ...ForgotFlow,
  ...OrderFlow,
  ...LoginFlow,
  ...ProductFlow,
];

export const MainStack = createStackNavigator();

export const MainStackScreen = () => (
  <MainStack.Navigator
    detachInactiveScreens
    screenOptions={{ headerShown: false }}
  >
    <MainStack.Screen name="HomeTabs" component={HomeTabs} />

    {flows.map((flow: Flow) => (
      <MainStack.Screen
        name={flow.name}
        component={flow.component}
        initialParams={flow.initialParams}
      />
    ))}
    <MainStack.Screen name="Example" component={ExampleScreen} />
    <MainStack.Screen name="SearchMenu" component={SearchScreen} />
    {/* <MainStack.Screen name="WishList" component={WishList} /> */}
    <MainStack.Screen name="CreateCartProfile" component={CreateCartProfile} />
    <MainStack.Screen name="WishListCategory" component={WishListCategory} />
    <MainStack.Screen name="IdentifyEmail" component={IdentifyEmail} />
    <MainStack.Screen
      name="ShowListByCategory"
      component={ShowListByCategory}
    />

    <MainStack.Screen name="BagScreen" component={BagScreen} />
    <MainStack.Screen name="StoreUpdate" component={StoreUpdate} />
    <MainStack.Screen name="Update" component={Update} />
    <MainStack.Screen
      name="SummaryScreen"
      component={SummaryScreen}
      initialParams={{
        paymentType: 'CreditCard',
      }}
    />
    <MainStack.Screen name="DeliveryScreen" component={DeliveryScreen} />
    <MainStack.Screen name="EnterYourEmail" component={EnterYourEmail} />
    <MainStack.Screen name="Checkout" component={Checkout} />
    <MainStack.Screen name="WithdrawInStore" component={WithdrawInStore} />
    <MainStack.Screen name="NearbyStores" component={NearbyStores} />
    <MainStack.Screen name="MapScreen" component={MapScreen} />
    <MainStack.Screen
      name="PaymentMethodScreen"
      component={PaymentMethodScreen}
    />
    <MainStack.Screen
      name="PurchaseConfirmationScreen"
      component={PurchaseConfirmationScreen}
    />
    <MainStack.Screen name="Cashback" component={Cashback} />
    <MainStack.Screen name="Credits" component={Credits} />
    <MainStack.Screen
      name="VirtualDebitCardCaixaScreen"
      component={VirtualDebitCardCaixaScreen}
    />
    <MainStack.Screen name="PixScreen" component={PixScreen} />
    <MainStack.Screen name="GiftVoucherScreen" component={GiftVoucherScreen} />
    <MainStack.Screen name="BarCodePayment" component={BarCodePayment} />
    <MainStack.Screen
      name="Register"
      component={Register}
      initialParams={{ reset: false }}
    />
    <MainStack.Screen
      name="RegisterSuccess"
      component={RegisterSuccess}
      initialParams={{ comefrom: 'Profile' }}
    />

    <MainStack.Screen name="SizeGuide" component={SizeGuide} />
    <MainStack.Screen name="WhatsappsHelp" component={WhatsappsHelp} />

    <MainStack.Screen name="EditProfile" component={EditProfile} />
    <MainStack.Screen name="EditPassword" component={EditPassword} />
    <MainStack.Screen
      name="NotificationProfile"
      component={NotificationProfile}
    />

    <MainStack.Screen
      name="ListCards"
      component={ListCards}
      initialParams={{ isCheckout: false }}
    />
    <MainStack.Screen
      name="NewCard"
      component={NewCard}
      initialParams={{ isCheckout: false }}
    />
    <MainStack.Screen name="CancelOrder" component={CancelOrder} />
    <MainStack.Screen name="CallCenter" component={CallCenter} />
  </MainStack.Navigator>
);
