import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, Platform } from "react-native";
import { TopBar } from "reserva-ui";

export const TopBarBackButtonWithoutLogo: React.FC<{
  showShadow?: Boolean;
  loading: Boolean;
  backButtonPress: () => void;
}> = ({ showShadow = true, backButtonPress, loading = false }) => {
  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      bg="white"
      showLogo={false}
      style={{ elevation: showShadow ? 10 : 0 }}
      boxShadow={showShadow && Platform.OS === "ios" ? "topBarShadow" : null}
      leftButton={{
        name: "ArrowBack",
        size: 24,
        onPress: () => {
          backButtonPress();
        },
      }}
      height={50}
    />
  );
};
