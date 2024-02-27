import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  container: {
    padding: 5,
  },

  content: {
    marginVertical: 5,
  },

  flagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.BLACK,
    width: 70,
    height: 30,
    borderRadius: 30,
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
    fontSize: 20,
  },
  productImage: {
    width: 165,
    height: 270,
    borderRadius: 10,
  },
  label: {
    fontFamily: FONTS.WORK_SANS_REGULAR,
    fontSize: 12,
  },

  listColorsProductContent: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  listColorsProductItem: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: COLORS.SHELF_LIGHT_GRAY,
    borderRadius: 50,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listSizesProductItemText: {
    fontFamily: FONTS.RESERVA_SANS_BLACK,
    fontSize: 13,
  },

  productListPriceLabel: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 15,
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
  },

  textButtonAddToBag: {
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontSize: 14,
    color: COLORS.WHITE,
  },

  contentAbsolute: {
    position: 'absolute',
  },

  radionButtonContainer: {
    borderWidth: 1,
    borderColor: COLORS.SHELF_GRAY,
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  radioButtonContent: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.BLACK,
    borderRadius: 20,
  },
});
