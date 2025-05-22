import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { COLORS } from '../../base/styles/colors';

export const styles = StyleSheet.create({
  textPrice: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: '#000000',
    letterSpacing: 0.05,
  },
  grey: {
    color: COLORS.LIGHT_GRAY,
  },
  black: {
    color: COLORS.BLACK,
  },
  textInstallments: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: '#333333',
    letterSpacing: 0.05,
  },
  divider: {
    backgroundColor: '#000000',
    width: 1,
    height: 16,
    marginHorizontal: configDeviceSizes.DEVICE_WIDTH > 320 ? 6 : 4,
  },
  textPricePrime: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: COLORS.RED,
    letterSpacing: 0.05,
  },
  containerPrime: {
    padding: 2,
    backgroundColor: COLORS.RED,
    marginLeft: 10,
  },
  labelPrime: {
    fontFamily: 'ReservaDisplay-Regular',
    color: COLORS.WHITE,
    fontSize: 8,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
