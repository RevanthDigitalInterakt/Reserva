import { Animated, StyleSheet } from 'react-native';

export const styles = (fadeAnim: Animated.Value) => StyleSheet.create({
  filtersWrapper: {
    opacity: fadeAnim,
    position: 'absolute',
    top: 100,
    backgroundColor: 'white',
    zIndex: 1,
  },
});
