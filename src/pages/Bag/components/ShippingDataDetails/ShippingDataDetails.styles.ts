import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const shippingDataDetailsStyles = StyleSheet.create({
  container: {
    padding: 8,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: 'column',
    paddingRight: 24,
    backgroundColor: COLORS.WHITE,
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.27,
    borderRadius: 8,
    shadowRadius: 3,
    elevation: 5,
  },
  shadowAndroid: {
    elevation: 5,
    borderRadius: 8,
  },
  contentWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerWrap: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-start',
    gap: 13,
  },
  buttonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 28,
    marginTop: 20,
  },
  iconRight: {
    width: 16,
    height: 16,
  },
  title: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    color: COLORS.TEXT_GRAY,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    color: COLORS.ENABLED_GREEN,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '700',
  },
  edit: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 12,
    fontWeight: '500',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.LIGHT_BLACK,
    textDecorationLine: 'underline',
  },
});
