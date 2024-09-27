import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  container: {},

  content: {
    marginVertical: 10,
  },

  flagContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.BLACK,
    width: 75,
    height: 30,
    borderRadius: 30,
    marginBottom: 7,
  },
  flagTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.WORK_SANS_BOLD_ITALIC,
    fontSize: 13,
    lineHeight: 15,
  },
  discountFlagTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.WORK_SANS_ITALIC,
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: -1.5,
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  productTitle: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 22,
    flexWrap: 'wrap',
  },
  productImage: {
    width: 150,
    height: 225,
    borderRadius: 20,
    marginRight: 10,
  },
  label: {
    fontFamily: FONTS.WORK_SANS_REGULAR,
    fontSize: 12,
    marginVertical: 5,
  },

  listColorsProductContent: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  listColorsContainer: {
    borderWidth: 1,
    width: 36,
    height: 36,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },

  listColorsProductItem: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: COLORS.SHELF_LIGHT_GRAY,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listSizesItem: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listColorsContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 8,
  },

  listSizesProductItemText: {
    fontFamily: FONTS.RESERVA_SANS_BLACK,
    fontSize: 13,
  },

  productListPriceLabel: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 18,
  },

  productCurrencyLabel: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 10,
  },

  productPriceCentsLabel: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 10,
  },

  row: {
    flexDirection: 'row',
  },

  buttonAddToFavorite: {
    backgroundColor: COLORS.BACKGROUND_GRAY,
    width: 40,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonAddToBag: {
    backgroundColor: COLORS.SHELF_GREEN,
    width: '87%',
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  textButtonAddToBag: {
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontSize: 14,
    color: COLORS.WHITE,
  },

  contentAbsolute: {
    position: 'absolute',
  },

  flagContainer: {
    position: 'absolute',
    top: 190,
    left: 10,
  },

  textLink: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.WORK_SANS_REGULAR,
    fontSize: 10,
  },

  cashbackFlagContainer: {
    backgroundColor: COLORS.BACKGROUND_LICHT_GRAY,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: 15,
    flexDirection: 'row',
  },

  priceSliderContainer: {
    width: '45%',
    flexDirection: 'row',
  },

  radioButtonContainer: {
    borderWidth: 1,
    width: 25,
    height: 25,
    borderRadius: 40,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonContent: {
    width: 18,
    height: 18,
    borderRadius: 50,
  },

  divider: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
