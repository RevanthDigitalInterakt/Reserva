import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, Platform } from "react-native";
import { TopBar } from "reserva-ui";
import { useCart } from "../../../context/CartContext";

export const TopBarDefault: React.FC<{
  showShadow?: Boolean;
  loading: Boolean;
}> = ({ showShadow = true, loading = false }) => {
  const navigation = useNavigation();
  const { orderForm } = useCart()
  return (
    <TopBar
      loading={loading}
      itemQuantity={orderForm?.items.length}
      paddingX="quarck"
      bg="white"
      style={{ elevation: 10 }}
      boxShadow={showShadow && Platform.OS === "ios" ? "topBarShadow" : null}
      leftButton={{
        name: "SideMenu",
        size: 24,
        onPress: () => {
          navigation.navigate("Menu");
        },
      }}
      rightButton1={{
        name: "Heart",
        size: 24,
        onPress: () => {
          navigation.navigate("WishList");
        },
      }}
      rightButton2={{
        name: "Handbag",
        size: 24,
        onPress: () => {
          // Alert.alert('button right 2');
          navigation.navigate("BagScreen");
        },
      }}
      height={50}
    />
  );
};
