import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import { COLORS, FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  container: {
    width: scale(97),
    height: scale(103),
    borderRadius: 8,
    backgroundColor: 'red',
    paddingHorizontal: scale(8),
    paddingVertical: scale(25),
    alignItems: 'center',
    gap: scale(9),
  },
  offerInfo: {
    fontSize: 11,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    color: COLORS.WHITE,
  },
  amountWrapper: {
    flexDirection: 'row',
  },
  currencyText: {
    fontSize: scale(9),
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    color: COLORS.WHITE,
  },
  amountText: {
    fontSize: scale(44.17),
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    color: COLORS.WHITE,
    marginTop: -10,
  },
});
