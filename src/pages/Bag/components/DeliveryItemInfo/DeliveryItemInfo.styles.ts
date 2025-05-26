import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const deliveryItemInfoStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 32,
    paddingVertical: 12,
    borderColor: COLORS.BORDER_GRAY,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  containerWrap: {
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',
  },
  textWrap: {},
  title: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '500',
  },
  subTitle: {
    color: COLORS.TEXT_GRAY,
    fontSize: 12,
    fontWeight: '500',
  },
  shippingValue: {
    color: COLORS.ENABLED_GREEN,
    fontWeight: '700',
  },
  iconRight: {
    maxHeight: 16,
    maxWidth: 16,
  },
});
