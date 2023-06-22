import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';

export const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.RED,
    backgroundColor: COLORS.SELECT_BOX_BACKGROUND,
  },
  imageBackgroundBadge: {
    width: 160,
    height: 28,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  integerPartPrime: {
    fontWeight: '700',
    fontSize: 24,
    color: COLORS.RED,
  },
  decimalPartPrime: {
    fontWeight: '700',
    color: COLORS.RED,
  },
  normalTextRed: {
    fontWeight: '400',
    fontSize: 18,
    color: COLORS.RED,
  },
  negativeMarginText: {
    marginLeft: -50,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginTop: 4,
  },
  primePrice: {
    marginHorizontal: 16,
  },
  primeCheckBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.RED,
  },
  primeCheckBoxFill: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLORS.RED,
  },
  priceDataWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  separator: {
    alignSelf: 'center',
    width: 1,
    height: 30,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginTop: 30,
  },
  bePrimeBadge: {
    backgroundColor: COLORS.RED,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  textWhite: {
    color: COLORS.WHITE,
  },
});
