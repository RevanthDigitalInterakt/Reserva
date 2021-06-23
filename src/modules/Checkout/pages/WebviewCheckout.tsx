import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Button } from "react-native";
import { Typography, Box, Icon, Divider } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { withAuthentication } from "../../Profile/HOC/withAuthentication";
import { WebView } from "react-native-webview";
import vtexService from "../../../services/vtexService";

const Checkout: React.FC<{}> = ({ route, navigation }) => {
  // const params = useParams();

  const getCart = async () => {
    try {
      const response = await vtexService.CreateCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <Button
        color="#841584"
        title="reqeust"
        onPress={() => {
          getCart();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <View style={{ width: "100%", height: 1000, backgroundColor: "red" }}>
            <WebView source={{ uri: "https://google.com" }} />
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
//  = withAuthentication(Checkout, "WebviewCheckout");
