import { Animated, StyleSheet } from "react-native";
import { COLORS } from "../../base/styles";

export const styles = (fadeAnim: Animated.Value) =>
  StyleSheet.create({
    filtersWrapper: {
      opacity: fadeAnim,
      position: "absolute",
      top: 100,
      backgroundColor: COLORS.WHITE,
      zIndex: 1,
    },
  });
