import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, Platform } from "react-native";
import { TopBar } from "reserva-ui";

export const TopBarBackButton: React.FC<{
  loading?: Boolean;
  showShadow?: Boolean;
  backButtonPress?: () => void;
}> = ({ showShadow = true, backButtonPress, loading = false }) => {
  const navigation = useNavigation();
  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      showLogo
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === "ios" ? "topBarShadow" : null}
      leftButton={{
        name: "ArrowBack",
        size: 24,
        onPress: () => {
          if (backButtonPress) {
            backButtonPress();
            return;
          }

          navigation.goBack();
        },
      }}
      height={50}
    />
  );
};
