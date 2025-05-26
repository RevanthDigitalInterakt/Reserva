import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles';
import { FONTS } from '../../../../base/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  childContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 41,
    height: 41,
  },
  textMoreItemsContainer: {
    marginTop: 6,
  },
  textMoreItems: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 20,
    lineHeight: 18.9,
    textAlign: 'center',
    color: COLORS.BLACK,
  },
  textSeeAllProductsContainer: {
    marginTop: 19,
  },
  textSeeAllProducts: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 13.86,
    lineHeight: 18.3,
    color: COLORS.BLACK,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
