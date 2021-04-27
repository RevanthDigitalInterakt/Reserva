// In App.js in a new project
import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../modules/Home/pages/Home";
import { SearchScreen } from "../modules/Search/pages/Search";
import AddressList from "../modules/Address/pages/AddressList";
import NewAddress from "../modules/Address/pages/NewAddress";
import { Tabs } from "./BottomTabNavigator";
import { Menu } from "../modules/Menu/modals/Menu";

import { horizontalAnimationBackwards } from "./utils/utils";
import { ExampleScreen } from "../modules/Example/pages/Example";
import { ProductCatalog } from "../modules/ProductCatalog/pages/ProductCatalog";
import { RegisterSuccess } from '../modules/Register/pages/RegisterSuccess';
import { LoginScreen } from "../modules/Login/pages/Login";

import { StackScreenProps } from "@react-navigation/stack";
import { Register } from "../modules/Register/pages/Register";
import { ForgotEmail } from "../modules/Forgot/pages/ForgotEmail";
import { ForgotEmailSuccess } from "../modules/Forgot/pages/ForgotEmailSuccess";
import { ForgotPassword } from "../modules/Forgot/pages/ForgotPassword";
import { ForgotNewPassword } from "../modules/Forgot/pages/ForgotNewPassword";

//profile
import { EditProfile } from "../modules/Profile/pages/EditProfile";
import { EditPassword } from "../modules/Profile/pages/EditPassword";
import { NotificationProfile } from "../modules/Profile/pages/NotificationProfile";
//--


export type RootStackParamList = {
  ProductCatalog: { safeArea: boolean };
  NewAddress: { id?: number };
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  // Here you put normal navigation
  return (
    <MainStack.Navigator detachInactiveScreens screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="HomeTabs" component={Tabs} />
      <MainStack.Screen name="Example" component={ExampleScreen} />
      <MainStack.Screen name="SearchMenu" component={SearchScreen} />
      <MainStack.Screen name="AddressList" component={AddressList} />
      <MainStack.Screen name="NewAddress" component={NewAddress} />
			<MainStack.Screen name="Login" component={LoginScreen} />
			<MainStack.Screen name="Register" component={Register} />
			<MainStack.Screen name="RegisterSuccess" component={RegisterSuccess} />
			<MainStack.Screen name="ForgotEmail" component={ForgotEmail} />
			<MainStack.Screen name="ForgotEmailSuccess" component={ForgotEmailSuccess} />
			<MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
			<MainStack.Screen name="ForgotNewPassword" component={ForgotNewPassword} />
      <MainStack.Screen
        name="ProductCatalog"
        initialParams={{ safeArea: true }}
        component={ProductCatalog}
      />

      <MainStack.Screen name="EditProfile" component={EditProfile} />
      <MainStack.Screen name="EditPassword" component={EditPassword} />
      <MainStack.Screen name="NotificationProfile" component={NotificationProfile} />
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
    </RootStack.Navigator>
  );
};

export default AppRouting;
