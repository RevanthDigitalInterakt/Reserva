// In App.js in a new project
import { createStackNavigator } from '@react-navigation/stack';
import { ChangeRegionalization } from '../modules/ChangeRegionalization/pages/ChangeRegionalization';
import React from 'react';
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
import { CorreReservaStackScreen } from '../modules/CorreReserva';
import { Credits } from '../modules/Credits/pages/Credits';
import { SizeGuide } from '../modules/HelpCenter/PagesHelp/SizeGuide';
import { WhatsappsHelp } from '../modules/HelpCenter/PagesHelp/WhatsappsHelp';
import { MyCashbackRoutes } from '../modules/my-cashback/navigation/MyCashbackNavigator';
import { MyCreditsRoutes } from '../modules/my-credits/navigation/MyCreditsNavigator';
import { EditPassword } from '../modules/Profile/pages/EditPassword';
// profile
import { EditProfile } from '../modules/Profile/pages/EditProfile';
import { ListCards } from '../modules/Profile/pages/ListCards';
import { NewCard } from '../modules/Profile/pages/NewCard';
import { NotificationProfile } from '../modules/Profile/pages/NotificationProfile';
import { SearchScreen } from '../modules/Search/pages/Search';
import { StoreUpdate } from '../modules/Update/pages/StoreUpdate';
import Update from '../modules/Update/pages/Update';
import { ShowListByCategory } from '../modules/WishList/pages/ShowListByCategory';
import { WishListCategory } from '../modules/WishList/pages/WishListCategory';
import {
  AddressFlow,
  ForgotFlow,
  HelpCenterFLow,
  LoginFlow,
  OrderFlow,
  ProductFlow,
  TimeRaceFlow,
  RegisterFlow,
} from './flows';
import { HomeTabs } from './HomeTabs';
import { Flow } from './types/flow.type';
import { CEPList, CepsInfo, SearchBy } from '../modules/ChangeRegionalization/pages/CEPList';

export type RootStackParamList = {
  SearchScreen: { searchterm?: string };
  ProductDetail: {
    productId: string;
    colorSelected: string;
    sizeSelected: string;
  };
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
  ChangeRegionalization: undefined;
  CEPList: {
    list: CepsInfo,
    searchBy: SearchBy
  };
  WishList: {};
  OrderDetail: {
    orderId?: string;
  };
  ForgotAccessCode: { email: string };
  ConfirmAccessCode: { email: string };
  ShowListByCategory: { categoryName: string; products: any[] };
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
  RegisterEmail: {};
  EditProfile: { isRegister: boolean };
  Home: undefined;
  CancelOrder: {};
  Cashback: { isAcceptedConditions: boolean };
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
  StoreUpdatePush: {} | undefined;
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
  ...TimeRaceFlow,
  ...MyCreditsRoutes,
  ...RegisterFlow,
  ...MyCashbackRoutes,
];

export const MainStack = createStackNavigator();

export const MainStackScreen = () => (
  <MainStack.Navigator
    detachInactiveScreens
    screenOptions={{ headerShown: false }}
  >
    <MainStack.Screen name="HomeTabs" component={HomeTabs} />

    <MainStack.Screen name="CorreReserva" component={CorreReservaStackScreen} />

    {flows.map((flow: Flow) => (
      <MainStack.Screen
        name={flow.name}
        component={flow.component}
        initialParams={flow.initialParams}
      />
    ))}
    <MainStack.Screen name="SearchMenu" component={SearchScreen} />
    {/* <MainStack.Screen name="WishList" component={WishList} /> */}
    <MainStack.Screen name="CreateCartProfile" component={CreateCartProfile} />
    <MainStack.Screen name="WishListCategory" component={WishListCategory} />
    <MainStack.Screen name="ChangeRegionalization" component={ChangeRegionalization} />
    <MainStack.Screen name="CEPList" component={CEPList} />
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
