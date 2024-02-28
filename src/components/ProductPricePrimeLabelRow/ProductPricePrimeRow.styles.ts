import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { COLORS } from '../../base/styles/colors';

export const styles = StyleSheet.create({
  textPrice: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: COLORS.GOLD,
    letterSpacing: 0.05,
  },
  textInstallments: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: COLORS.GOLD,
    letterSpacing: 0.05,
  },
  divider: {
    backgroundColor: COLORS.GOLD,
    width: 1,
    height: 16,
    marginHorizontal: configDeviceSizes.DEVICE_WIDTH > 320 ? 6 : 4,
  },
  containerPrime: {
    padding: 2,
    backgroundColor: COLORS.GOLD,
  },
  labelPrime: {
    fontFamily: 'ReservaDisplay-Regular',
    color: COLORS.WHITE,
    fontSize: 8,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
