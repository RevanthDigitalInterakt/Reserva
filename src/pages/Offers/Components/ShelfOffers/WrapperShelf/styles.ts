import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../base/styles';
import { scale } from '../../../../../utils/scale';

export const styles = StyleSheet.create({
  textShelfTitle: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    lineHeight: scale(24),
    fontSize: scale(18),
    letterSpacing: -0.5,
  },
  shelfContainer: {
    marginTop: 0,
    marginHorizontal: scale(4),
    paddingLeft: 10,
  },
  shelf: {
    flexDirection: 'row',
    marginTop: scale(8),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textShelfName: {
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontSize: scale(14),
    lineHeight: scale(18),
    letterSpacing: -0.2,
  },
  actionTitleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 20,
  },
  actionTitleText: {
    color: COLORS.SHELF_DARK_GRAY,
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
    fontSize: scale(12),
    lineHeight: scale(12),
  },
  iconContainer: {
    top: -0.7,
  },
});
