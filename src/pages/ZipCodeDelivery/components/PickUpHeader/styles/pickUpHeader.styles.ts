import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../base/styles';

export const pickUpHeaderStyles = StyleSheet.create({
  containerMarginTop: {
    marginTop: 16,
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },
  divider: {
    height: 1,
    minWidth: '25%',
    backgroundColor: COLORS.CEMENT_GRAY,
  },
  dividerText: {
    fontWeight: '700',
    color: COLORS.TEXT_INPUT,
  },
  deliveryText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '700',
    fontSize: 18,
  },
  pickUpText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '400',
  },
  pickUpDiscountStoreText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '700',
    color: COLORS.ENABLED_GREEN,
  },
  pickUpTextBold: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '700',
  },
  containerMarginBottom: {
    marginBottom: 16,
  },
});
