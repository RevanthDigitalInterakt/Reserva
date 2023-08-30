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
    borderColor: COLORS.LIGHT_GRAY,
  },
  minHeight: {
    minHeight: 72,
  },
  integerPart: {
    fontWeight: '700',
    fontSize: 24,
    color: COLORS.LIGHT_GRAY,
  },
  decimalPart: {
    fontWeight: '700',
    color: COLORS.LIGHT_GRAY,
  },
  marginText: {
    marginRight: 50,
  },
  normalTextGray: {
    fontWeight: '400',
    fontSize: 18,
    color: COLORS.LIGHT_GRAY,
  },
  normalTextBlack: {
    color: COLORS.BLACK,
  },
  mtSeparator: {
    marginTop: 30,
  },
  mDefaultSeparator: {
    margin: 0,
  },
  mtPrice: {
    marginTop: 24,
  },
  mDefaultPrice: {
    margin: 0,
  },
  normalPrice: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  normalCheckBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    marginRight: smallDevices ? 15 : 0,
  },
  normalCheckBoxFill: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: COLORS.BLACK,
  },
  normalText: {
    fontWeight: '400',
    fontSize: 18,
    color: COLORS.LIGHT_GRAY,
  },
  priceDataWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  ml: {
    marginLeft: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginTop: 4,
  },
  separator: {
    alignSelf: 'center',
    width: 1,
    height: 30,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginHorizontal: smallDevices ? 15 : 0,
  },
});
