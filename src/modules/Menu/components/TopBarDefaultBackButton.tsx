import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, Platform } from "react-native";
import { TopBar } from "reserva-ui";

export const TopBarDefaultBackButton: React.FC<{
  loading?: Boolean;
  showShadow?: Boolean;
}> = ({ showShadow = true, loading = false }) => {
  const navigation = useNavigation();

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === "ios" ? "topBarShadow" : null}
      leftButton={{
        name: "ArrowBack",
        size: 24,
        onPress: () => {
          navigation.goBack();
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
