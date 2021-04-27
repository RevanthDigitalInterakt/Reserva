import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, Button, Alert, Icon } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import Order from "../Components/Order";
const OrderList = () => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView flex={1} backgroundColor={"white"}>
        <TopBarBackButton showShadow />

        <Box
          mb="xxxs"
          paddingHorizontal={20}
          justifyContent="flex-start"
          paddingTop={"md"}
        >
          <Typography fontSize={20} fontFamily="reservaSerifRegular">
            Meus pedidos
          </Typography>
        </Box>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Box flex={1} paddingX={"xxxs"} bg="backgoundInput" width={"100%"}>
            {/* aqui dentro os pedidos */}
            <Order
              onPress={() => {
                navigation.navigate("OrderDetail");
              }}
              delivered={true}
            />
            <Order />
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default OrderList;
