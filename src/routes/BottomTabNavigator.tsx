import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../modules/Home/pages/Home";

import * as React from "react";
import { BottomBar, BottomBarButton, Box, theme } from "reserva-ui";
import { SearchScreen } from "../modules/Search/pages/Search";
import { ExampleScreen } from "../modules/Example/pages/Example";
import { ProductCatalog } from "../modules/ProductCatalog/pages/ProductCatalog";


import { MenuProfile } from "../modules/Profile/pages/MenuProfile";

type OnPressType = {
  key: string;
  name: string;
};

const Tab = createBottomTabNavigator();

export const DefaultRoutes = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps<{}>) => {
  console.log(state);

  const onPress = ({ key, name }: OnPressType, isFocused: Boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(name);
    }
  };

  return (
    <Box flexDirection="row">
      <BottomBar>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <BottomBarButton
              key={route.key}
              isSlected={isFocused}
              onPress={() => onPress(route, isFocused)}
              iconName={route.name}
            />
          );
        })}
      </BottomBar>
    </Box>
  );
};

export const Tabs = () => {
  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.white }} flex={1}>
      <Tab.Navigator tabBar={(props) => <DefaultRoutes {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="SearchMenu" component={ExampleScreen} />
        <Tab.Screen
          name="Offers"
          component={ProductCatalog}
          initialParams={{ safeArea: false }}
        />
        <Tab.Screen name="Profile" component={MenuProfile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
