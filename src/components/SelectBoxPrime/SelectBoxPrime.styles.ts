import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../base/styles/colors';

const smallDevices = Dimensions.get('screen').width <= 375;

export const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.GOLD,
    backgroundColor: COLORS.BACKGROUND_GOLD,
  },
  minHeight: {
    minHeight: 72,
  },
  between: {
    justifyContent: 'space-between',
  },
  start: {
    justifyContent: 'flex-start',
  },
  ml: {
    marginLeft: 16,
  },
  imageBackgroundBadge: {
    width: smallDevices ? 135 : 160,
    height: smallDevices ? 24 : 28,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  integerPartPrime: {
    fontWeight: '700',
    fontSize: 24,
    color: COLORS.DARK_GOLD_TEXT,
  },
  decimalPartPrime: {
    fontWeight: '700',
    color: COLORS.GOLD,
  },
  decimalText: {
    color: COLORS.DARK_GOLD_TEXT,
  },
  normalTextRed: {
    fontWeight: '400',
    fontSize: 18,
    color: COLORS.DARK_GOLD_TEXT,
  },
  negativeMarginText: {
    marginLeft: smallDevices ? -35 : -40,
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
    borderColor: COLORS.GOLD,
    marginRight: smallDevices ? 15 : 0,
  },
  primeCheckBoxFill: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLORS.GOLD,
  },
  priceDataWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginLeft: 16,
  },
  priceDataEconomy: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginLeft: 6,
  },
  separator: {
    alignSelf: 'center',
    width: 1,
    height: 30,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginHorizontal: 15,
  },
  mt: {
    marginTop: 30,
  },
  mDefault: {
    margin: 0,
  },
  bePrimeBadge: {
    backgroundColor: COLORS.GOLD,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  textWhite: {
    color: COLORS.WHITE,
  },
  textRedBadge: {
    color: COLORS.WHITE,
    fontSize: smallDevices ? 12 : 15,
  },
});
