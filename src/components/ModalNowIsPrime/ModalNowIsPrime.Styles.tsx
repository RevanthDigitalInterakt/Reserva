import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';
import { FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: COLORS.WHITE,
  },
  textContainer: {
    paddingVertical: 24,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primeText: {
    fontFamily: FONTS.RESERVA_DISPLAY_REGULAR,
    fontSize: scale(14),
    fontWeight: '400',
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  text: {
    color: COLORS.DARK_GRAY,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: scale(14),
    lineHeight: 20,
  },
});
