import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'space-between',
    padding: 40,
    backgroundColor: COLORS.WHITE,
  },
  textContainer: {
    paddingVertical: 40,
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  primeText: {
    fontSize: 20,
  },
  text: {
    color: COLORS.DARK_GRAY,
    lineHeight: 27,
  },
});
