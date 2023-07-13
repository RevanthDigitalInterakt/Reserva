import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../base/styles/colors';

const smallDevices = Dimensions.get('screen').width <= 375;

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
    width: smallDevices ? 135 : 160,
    height: smallDevices ? 24 : 28,
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
    borderColor: COLORS.RED,
    marginRight: smallDevices ? 15 : 0,
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
    marginHorizontal: smallDevices ? 15 : 0,
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
  textRedBadge: {
    color: COLORS.WHITE,
    fontSize: smallDevices ? 12 : 15,
  },
});
