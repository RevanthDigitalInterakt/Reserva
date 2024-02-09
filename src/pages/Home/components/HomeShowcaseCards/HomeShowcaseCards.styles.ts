import { StyleSheet } from 'react-native';
import { FONTS, COLORS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 155,
    height: 270,
    borderRadius: 10,
  },
  productName: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontSize: 15,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salePrice: {
    fontSize: 17,
    lineHeight: 23,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
  },
  decimalPart: {
    fontSize: 11,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    marginTop: -4,
  },
  listPrice: {
    marginLeft: 10,
    color: COLORS.LIGHT_GRAY,
    textDecorationLine: 'line-through',
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: 17,
    lineHeight: 23,
  },
  listPriceDecimal: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONTS.NUNITO_REGULAR,
    lineHeight: 17,
    fontSize: 11,
  },
});
