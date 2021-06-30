// In App.js in a new project
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AddressList from "../modules/Address/pages/AddressList";
import NewAddress from "../modules/Address/pages/NewAddress";
import { BagScreen } from "../modules/Checkout/pages/Bag";
import { BarCodePayment } from "../modules/Checkout/pages/BarCodePayment";
import { DeliveryScreen } from "../modules/Checkout/pages/Delivery";
import Checkout from "../modules/Checkout/pages/WebviewCheckout";
import { GiftVoucherScreen } from "../modules/Checkout/pages/GiftVoucher";
import { MapScreen } from "../modules/Checkout/pages/Map";
import { NearbyStores } from "../modules/Checkout/pages/NearbyStores";
import { PaymentMethodScreen } from "../modules/Checkout/pages/PaymentMethod";
import { PixScreen } from "../modules/Checkout/pages/Pix";
import { PurchaseConfirmationScreen } from "../modules/Checkout/pages/PurchaseConfirmation";
import { SummaryScreen } from "../modules/Checkout/pages/Summary";
import { VirtualDebitCardCaixaScreen } from "../modules/Checkout/pages/VirtualDebitCardCaixa";
import { WithdrawInStore } from "../modules/Checkout/pages/WithdrawInStore";
import { ExampleScreen } from "../modules/Example/pages/Example";
import { ForgotEmail } from "../modules/Forgot/pages/ForgotEmail";
import { ForgotEmailSuccess } from "../modules/Forgot/pages/ForgotEmailSuccess";
import { ForgotNewPassword } from "../modules/Forgot/pages/ForgotNewPassword";
import { ForgotPassword } from "../modules/Forgot/pages/ForgotPassword";
//--
import { HelpCenter } from "../modules/HelpCenter/pages/HelpCenter";
import { ClothingCare } from "../modules/HelpCenter/PagesHelp/ClothingCare";
import { ContactUs } from "../modules/HelpCenter/PagesHelp/ContactUs";
import { Exchanges } from "../modules/HelpCenter/PagesHelp/Exchanges";
import { SizeGuide } from "../modules/HelpCenter/PagesHelp/SizeGuide";
import { OrdersAndDeliveries } from "../modules/HelpCenter/PagesHelp/OrdersAndDeliveries";
import { HelpPaymentMethods } from "../modules/HelpCenter/PagesHelp/HelpPaymentMethods";
import { FrequentDoubts } from "../modules/HelpCenter/PagesHelp/FrequentDoubts";
import { PrivacyPolicy } from "../modules/HelpCenter/PagesHelp/PrivacyPolicy";

import { WhatsappsHelp } from "../modules/HelpCenter/PagesHelp/WhatsappsHelp";
import { LoginScreen } from "../modules/Login/pages/Login";
import { LoginAlternative } from "../modules/Login/pages/LoginAlternative";
import { Menu } from "../modules/Menu/modals/Menu";
import OrderCancel from "../modules/Order/pages/OrderCancel";
import OrderDetail from "../modules/Order/pages/OrderDetail";
import OrderList from "../modules/Order/pages/OrderList";
import { ProductCatalog } from "../modules/ProductCatalog/pages/ProductCatalog";
import { ProductDetail } from "../modules/ProductDetail/pages/ProductDetail";
import { EditPassword } from "../modules/Profile/pages/EditPassword";
//profile
import { EditProfile } from "../modules/Profile/pages/EditProfile";
import { ListCards } from "../modules/Profile/pages/ListCards";
import { NewCard } from "../modules/Profile/pages/NewCard";
import { NotificationProfile } from "../modules/Profile/pages/NotificationProfile";
import { Register } from "../modules/Register/pages/Register";
import { RegisterSuccess } from "../modules/Register/pages/RegisterSuccess";
import { SearchScreen } from "../modules/Search/pages/Search";
import { ShowListByCategory } from "../modules/WishList/pages/ShowListByCategory";
import { WishList } from "../modules/WishList/pages/WishList";
import { WishListCategory } from "../modules/WishList/pages/WishListCategory";
import { Product } from "../store/ducks/product/types";
import { Wish } from "../store/ducks/wishlist/types";
import { Tabs } from "./BottomTabNavigator";
import { horizontalAnimationBackwards } from "./utils/utils";
import { CancelOrder } from "../modules/CancelOrder/pages/CancelOrder";
import { Cashback } from "../modules/Cashback/pages/Cashback";
import AccessCode from "../modules/Login/pages/AccessCode";
import { IdentifyEmail } from "../modules/LoginCheckout/pages/IdentifyEmail";
import { ForgotAccessCode } from "../modules/Forgot/pages/ForgotAccessCode";

export type RootStackParamList = {
  Register: {
    reset: Boolean;
    comeFrom: "Profile" | "Menu" | "Checkout" | "Favorite";
  };
  SearchScreen: { searchterm?: string };
  ProductDetail: { productId: string };
  RegisterSuccess: { comeFrom: "Profile" | "Menu" | "Checkout" | "Favorite" };
  LoginAlternative: { comeFrom: "Profile" | "Menu" | "Checkout" | "Favorite" };
  ProductCatalog: { safeArea: boolean; search: boolean };
  WishList: {};
  ForgotAccessCode: { email: string };
  ShowListByCategory: { categoryName: string; products: Wish[] };
  IdentifyEmail: {};
  AccessCode: {},
  ForgotPassword: {} | undefined
  ForgotNewPassword: { email: string, code: string }
  ForgotEmailSuccess: {} | undefined
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
  CancelOrder: {};
  Cashback: {};
  AddressList: { isCheckout: boolean };
  ListCards: {
    isCheckout: boolean;
    cashback: boolean;
  };
  EditPassword: {
    email: string;
  };
  NewCard: { isCheckout: boolean };
  NearbyStores: { UF: string };
  MapScreen: { geolocation: number; locationPermission: boolean };
  SummaryScreen: {
    paymentType:
    | "PIX"
    | "Credit"
    | "Debit"
    | "Boleto"
    | "GiftCard"
    | "Cashback";
    cashback: boolean;
  };
  PurchaseConfirmationScreen: {
    paymentType:
    | "PIX"
    | "Credit"
    | "Debit"
    | "Boleto"
    | "GiftCard"
    | "Cashback";
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

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  // Here you put normal navigation
  return (
    <MainStack.Navigator
      //initialRouteName='ForgotEmailSuccess'
      detachInactiveScreens
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="HomeTabs" component={Tabs} />
      <MainStack.Screen name="Example" component={ExampleScreen} />
      <MainStack.Screen name="SearchMenu" component={SearchScreen} />
      <MainStack.Screen
        name="AddressList"
        component={AddressList}
        initialParams={{ isCheckout: false }}
      />
      <MainStack.Screen
        name="NewAddress"
        component={NewAddress}
        initialParams={{
          isCheckout: false,
        }}
      />
      <MainStack.Screen name="WishList" component={WishList} />
      <MainStack.Screen name="WishListCategory" component={WishListCategory} />
      <MainStack.Screen name="IdentifyEmail" component={IdentifyEmail} />
      <MainStack.Screen
        name="ShowListByCategory"
        component={ShowListByCategory}
      />

      <MainStack.Screen name="BagScreen" component={BagScreen} />
      <MainStack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        initialParams={{
          paymentType: "CreditCard",
        }}
      />
      <MainStack.Screen name="DeliveryScreen" component={DeliveryScreen} />
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
      <MainStack.Screen
        name="VirtualDebitCardCaixaScreen"
        component={VirtualDebitCardCaixaScreen}
      />
      <MainStack.Screen name="PixScreen" component={PixScreen} />
      <MainStack.Screen
        name="GiftVoucherScreen"
        component={GiftVoucherScreen}
      />
      <MainStack.Screen name="BarCodePayment" component={BarCodePayment} />
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="AccessCode" component={AccessCode} />
      <MainStack.Screen
        name="Register"
        component={Register}
        initialParams={{ reset: false }}
      />
      <MainStack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        initialParams={{ comefrom: "Profile" }}
      />
      <MainStack.Screen name="ForgotEmail" component={ForgotEmail} />
      <MainStack.Screen
        name="ForgotEmailSuccess"
        component={ForgotEmailSuccess}
      />
      <MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <MainStack.Screen name="ForgotAccessCode" component={ForgotAccessCode} />
      <MainStack.Screen
        name="ForgotNewPassword"
        component={ForgotNewPassword}
      />
      <MainStack.Screen
        name="ProductCatalog"
        initialParams={{ safeArea: true, search: false }}
        component={ProductCatalog}
      />

      <MainStack.Screen name="ProductDetail" component={ProductDetail} />
      <MainStack.Screen name="OrderList" component={OrderList} />
      <MainStack.Screen name="OrderDetail" component={OrderDetail} />
      <MainStack.Screen name="OrderCancel" component={OrderCancel} />

      <MainStack.Screen name="HelpCenter" component={HelpCenter} />
      <MainStack.Screen name="SizeGuide" component={SizeGuide} />
      <MainStack.Screen name="ClothingCare" component={ClothingCare} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="Exchanges" component={Exchanges} />
      <MainStack.Screen
        name="OrdersAndDeliveries"
        component={OrdersAndDeliveries}
      />
      <MainStack.Screen
        name="HelpPaymentMethods"
        component={HelpPaymentMethods}
      />
      <MainStack.Screen name="FrequentDoubts" component={FrequentDoubts} />
      <MainStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
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
    </MainStack.Navigator>
  );
};

const AppRouting = () => {
  return (
    <RootStack.Navigator
      mode="modal"
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      {/* After that you put modal Screens */}
      <RootStack.Screen
        name="Menu"
        options={horizontalAnimationBackwards}
        component={Menu}
      />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen
        name="LoginAlternative"
        component={LoginAlternative}
        initialParams={{ comeFrom: "Profile" }}
      />
    </RootStack.Navigator>
  );
};

export default AppRouting;
