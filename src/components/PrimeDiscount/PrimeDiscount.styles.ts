import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    maxHeight: 48,
    flex: 1,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_GOLD,
    borderColor: '#C4A968',
    borderWidth: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    color: COLORS.DARK_GOLD_TEXT,
    fontSize: 20,
  },
  containerText: {
    flex: 1,
    flexDirection: 'row',
  },
  containerPriceCustom: {
    marginLeft: 16,
  },
  boldText: {
    fontFamily: FONTS.RESERVA_DISPLAY_REGULAR,
    fontSize: scale(13),
    fontWeight: '400',
    color: COLORS.DARK_GOLD_TEXT,
  },
  text: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: scale(12),
    fontWeight: '700',
    color: COLORS.DARK_GOLD_TEXT,
  },
  textInfo: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: scale(12),
    fontWeight: '400',
    color: COLORS.GRAY,
    textAlign: 'center',
    marginTop: 12,
  },
  textInfoBold: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: scale(11),
    fontWeight: '700',
    color: COLORS.GRAY,
    textAlign: 'center',
    marginBottom: 21,
  },
});
