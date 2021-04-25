// In App.js in a new project
import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../modules/Home/pages/Home";
import { SearchScreen } from "../modules/Search/pages/Search";
import MyAddress from "../modules/Address/pages/MyAddress";
import { Tabs } from "./BottomTabNavigator";
import { Menu } from "../modules/Menu/modals/Menu";

import { horizontalAnimationBackwards } from "./utils/utils";
import { ExampleScreen } from "../modules/Example/pages/Example";
import { ProductCatalog } from "../modules/ProductCatalog/pages/ProductCatalog";

import { StackScreenProps } from "@react-navigation/stack";
import OrderList from "../modules/Order/pages/OrderList";

export type RootStackParamList = {
  ProductCatalog: { safeArea: boolean };
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  // Here you put normal navigation
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="HomeTabs" component={Tabs} />
      <MainStack.Screen name="Example" component={ExampleScreen} />
      <MainStack.Screen name="SearchMenu" component={SearchScreen} />
      <MainStack.Screen
        name="ProductCatalog"
        initialParams={{ safeArea: true }}
        component={ProductCatalog}
      />
      <MainStack.Screen name="MyAddress" component={MyAddress} />
      <MainStack.Screen name="OrderList" component={OrderList} />
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
