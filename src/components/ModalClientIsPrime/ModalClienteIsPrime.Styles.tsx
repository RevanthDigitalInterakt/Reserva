import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';

export const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: COLORS.WHITE,
  },
  textContainer: {
    paddingVertical: 24,
  },
  textBold: {
    fontFamily: 'ReservaSans-Bold',
    fontSize: 16,
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  primeText: {
    fontFamily: 'ReservaDisplay-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  text: {
    color: COLORS.DARK_GRAY,
    fontFamily: 'ReservaSans-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
});
