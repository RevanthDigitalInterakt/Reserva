// In App.js in a new project
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../modules/Home/pages/Home';
import { SearchScreen } from '../modules/Search/pages/Search';
import AddressList from '../modules/Address/pages/AddressList';
import NewAddress from '../modules/Address/pages/NewAddress';
import { Tabs } from './BottomTabNavigator';
import { Menu } from '../modules/Menu/modals/Menu';

import { horizontalAnimationBackwards } from './utils/utils';
import { ExampleScreen } from '../modules/Example/pages/Example';
import { ProductCatalog } from '../modules/ProductCatalog/pages/ProductCatalog';
import { RegisterSuccess } from '../modules/Register/pages/RegisterSuccess';
import { LoginScreen } from '../modules/Login/pages/Login';
import { BagScreen } from '../modules/Checkout/pages/Bag';
import { DeliveryScreen } from '../modules/Checkout/pages/Delivery';
import { GiftVoucherScreen } from '../modules/Checkout/pages/GiftVoucher';
import { PaymentMethodScreen } from '../modules/Checkout/pages/PaymentMethod';
import { StackScreenProps } from '@react-navigation/stack';
import OrderList from '../modules/Order/pages/OrderList';
import OrderDetail from '../modules/Order/pages/OrderDetail';
import OrderCancel from '../modules/Order/pages/OrderCancel';
import { Register } from '../modules/Register/pages/Register';
import { ForgotEmail } from '../modules/Forgot/pages/ForgotEmail';
import { ForgotEmailSuccess } from '../modules/Forgot/pages/ForgotEmailSuccess';
import { ForgotPassword } from '../modules/Forgot/pages/ForgotPassword';
import { ForgotNewPassword } from '../modules/Forgot/pages/ForgotNewPassword';
import { ProductDetail } from '../modules/ProductDetail/pages/ProductDetail';

//profile
import { EditProfile } from '../modules/Profile/pages/EditProfile';
import { EditPassword } from '../modules/Profile/pages/EditPassword';
import { NotificationProfile } from '../modules/Profile/pages/NotificationProfile';
import { MyCards } from '../modules/Profile/pages/MyCards';
import { NewCard } from '../modules/Profile/pages/NewCard';
//--

import { HelpCenter } from '../modules/HelpCenter/pages/HelpCenter';
import { SizeGuide } from '../modules/HelpCenter/PagesHelp/SizeGuide';
import { ClothingCare } from '../modules/HelpCenter/PagesHelp/ClothingCare';

import { ContactUs } from '../modules/HelpCenter/PagesHelp/ContactUs';
import { Exchanges } from '../modules/HelpCenter/PagesHelp/Exchanges';
import { WhatsappsHelp } from '../modules/HelpCenter/PagesHelp/WhatsappsHelp';

export type RootStackParamList = {
  ProductCatalog: { safeArea: boolean; search: boolean };
  NewAddress: { id?: number };
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  // Here you put normal navigation
  return (
    <MainStack.Navigator
      detachInactiveScreens
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name='HomeTabs' component={Tabs} />
      <MainStack.Screen name='Example' component={ExampleScreen} />
      <MainStack.Screen name='SearchMenu' component={SearchScreen} />
      <MainStack.Screen name='AddressList' component={AddressList} />
      <MainStack.Screen name='NewAddress' component={NewAddress} />
      <MainStack.Screen name='BagScreen' component={BagScreen} />
      <MainStack.Screen name='DeliveryScreen' component={DeliveryScreen} />
      <MainStack.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} />
      <MainStack.Screen
        name='GiftVoucherScreen'
        component={GiftVoucherScreen}
      />
      <MainStack.Screen name='Login' component={LoginScreen} />
      <MainStack.Screen name='Register' component={Register} />
      <MainStack.Screen name='RegisterSuccess' component={RegisterSuccess} />
      <MainStack.Screen name='ForgotEmail' component={ForgotEmail} />
      <MainStack.Screen
        name='ForgotEmailSuccess'
        component={ForgotEmailSuccess}
      />
      <MainStack.Screen name='ForgotPassword' component={ForgotPassword} />
      <MainStack.Screen
        name='ForgotNewPassword'
        component={ForgotNewPassword}
      />
      <MainStack.Screen
        name='ProductCatalog'
        initialParams={{ safeArea: true, search: false }}
        component={ProductCatalog}
      />
      <MainStack.Screen name='ProductDetail' component={ProductDetail} />
      <MainStack.Screen name='OrderList' component={OrderList} />
      <MainStack.Screen name='OrderDetail' component={OrderDetail} />
      <MainStack.Screen name='OrderCancel' component={OrderCancel} />

      <MainStack.Screen name="HelpCenter" component={HelpCenter} />
      <MainStack.Screen name="SizeGuide" component={SizeGuide} />
      <MainStack.Screen name="ClothingCare" component={ClothingCare} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="Exchanges" component={Exchanges} />
      <MainStack.Screen name="WhatsappsHelp" component={WhatsappsHelp} />
      <MainStack.Screen name='EditProfile' component={EditProfile} />
      <MainStack.Screen name='EditPassword' component={EditPassword} />
      <MainStack.Screen name='NotificationProfile' component={NotificationProfile}
      />

      <MainStack.Screen name='MyCards' component={MyCards} />
      <MainStack.Screen name='NewCard' component={NewCard} />
    </MainStack.Navigator>
  );
};

const AppRouting = () => {
  return (
    <RootStack.Navigator
      mode='modal'
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen
        name='Main'
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      {/* After that you put modal Screens */}
      <RootStack.Screen
        name='Menu'
        options={horizontalAnimationBackwards}
        component={Menu}
      />
      <RootStack.Screen name='Login' component={LoginScreen} />
    </RootStack.Navigator>
  );
};

export default AppRouting;
