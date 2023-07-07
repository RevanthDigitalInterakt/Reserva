import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  primeTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    paddingTop: 1.5,
    paddingBottom: 2.5,
  },
});
