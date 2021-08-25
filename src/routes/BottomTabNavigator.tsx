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
import { ExampleScreen } from "../modules/Example/pages/Example";
import { ProductCatalog } from "../modules/ProductCatalog/pages/ProductCatalog";

import { MenuProfile } from "../modules/Profile/pages/MenuProfile";
import { Search, SearchScreen } from "../modules/Search/pages/Search";
import CallCenter from "../modules/CallCenter";
import { ContactUs } from "../modules/HelpCenter/PagesHelp/ContactUs";
import { WishList } from "../modules/WishList/pages/WishList";

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
          const { params } = route
          console.log(route)
          return (
            <BottomBarButton
              key={route.key}
              isSlected={isFocused}
              onPress={() => onPress(route, isFocused)}
              iconName={route.name}
              label={params?.label || ''}
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
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{ label: 'Início' }} />
        {/* <Tab.Screen
          name="SearchMenu"
          initialParams={{ safeArea: false, search: true, label: 'Inicío' }}
          component={SearchScreen}
        /> */}
        <Tab.Screen
          name="Offers"
          component={ProductCatalog}
          initialParams={{
            safeArea: false,
            categoryId: "reserva-bazar-camisetas",
            label: 'Promoções',
            facetInput: [
              {
                key: "category-2",
                value: "masculino",
              },
              {
                key: "productClusterIds",
                value: "326",
              },
            ],
          }}
        />
        <Tab.Screen name='Heart' component={WishList} initialParams={{ label: 'Favoritos' }} />
        <Tab.Screen name="Profile" component={MenuProfile} initialParams={{ label: 'Perfil' }} />
        <Tab.Screen name="Call" component={CallCenter} initialParams={{ label: 'Central' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
