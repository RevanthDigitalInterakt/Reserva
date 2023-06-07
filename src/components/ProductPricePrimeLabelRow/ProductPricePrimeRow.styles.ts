import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';

export const styles = StyleSheet.create({
  textPrice: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: '#A01E21',
    letterSpacing: 0.05,
  },
  textInstallments: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: '#A01E21',
    letterSpacing: 0.05,
  },
  divider: {
    backgroundColor: '#A01E21',
    width: 1,
    height: 16,
    marginHorizontal: configDeviceSizes.DEVICE_WIDTH > 320 ? 6 : 4,
  },
  containerPrime: {
    padding: 2,
    backgroundColor: '#A01E21',
  },
  labelPrime: {
    fontFamily: 'ReservaDisplay-Regular',
    color: '#ffffff',
    fontSize: 8,
  },
});
