import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, Platform } from "react-native";
import { TopBar } from "reserva-ui";

export const TopBarDefaultBackButton: React.FC<{
  showShadow?: Boolean;
}> = ({ showShadow = true }) => {
  const navigation = useNavigation();

  return (
    <TopBar
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
          Alert.alert("button right 1");
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
