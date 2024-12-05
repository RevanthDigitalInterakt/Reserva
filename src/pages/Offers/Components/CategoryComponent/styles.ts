import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    paddingTop: scale(14),
  },
  childrenContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: scale(14),
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: scale(18),
    lineHeight: scale(22),
    letterSpacing: -0.5,
    color: COLORS.LOADING_BORDER,
  },
  containerSeeAll: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  txtSeeAll: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: scale(12),
    lineHeight: scale(14),
    color: COLORS.GRAY_A6,
  },

});
