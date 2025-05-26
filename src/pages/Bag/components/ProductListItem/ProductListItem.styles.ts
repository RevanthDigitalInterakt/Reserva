import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';
import { FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  primeTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    paddingTop: 1.5,
    paddingBottom: 2.5,
  },
  productTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  attributesWrap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  productAttributeWrap: {
    flexDirection: 'row',
    gap: 4,
  },
  productAttributeLabel: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 12,
    fontWeight: '700',
  },
  productAttributeValue: {
    color: COLORS.TEXT_GRAY,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 12,
    fontWeight: '400',
  },
  productAttributeSeparator: {},
  valueWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
