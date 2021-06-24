import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import { Typography, Box, Icon, Divider } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { withAuthentication } from "../../Profile/HOC/withAuthentication";
import { WebView } from "react-native-webview";
import vtexService from "../../../services/vtexService";

const Checkout: React.FC<{}> = ({ route, navigation }) => {
  // const params = useParams();

  const [orderFormId, setOrderFormId] = useState("");

  const createCart = async () => {
    try {
      const response = await vtexService.CreateCart();
      if (response) {
        setOrderFormId(response.data.orderFormId);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkURL = (url: any) => {
    const check = url.includes("/checkout/orderPlaced");
    // verifica a url do webview se ja está no checkout/orderplaced para pegar o orderGroup da url.
    if (check) {
      Alert.alert(url);
    }
  };

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <Button
        color="#841584"
        title="criar carrinho"
        onPress={() => {
          createCart();
        }}
      />
      <Button
        color="#841584"
        title="teste"
        onPress={() => {
          teste();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          {orderFormId != "" && (
            <View
              style={{ width: "100%", height: 1000, backgroundColor: "red" }}
            >
              <WebView
                onNavigationStateChange={(navState) => {
                  checkURL(navState.url);
                }}
                source={{
                  uri: `https://lojausereserva.vtexcommercestable.com.br/checkout/?orderFormId=${orderFormId}/&webview=true&app=applojausereserva&savecard=true&utm_source=app&utm_medium={medium}/#payment`,
                }}
              />
            </View>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
