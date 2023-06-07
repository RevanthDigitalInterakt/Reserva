import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';

export const styles = StyleSheet.create({
  textPrice: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: '#8A8C8E',
    letterSpacing: 0.05,
  },
  textInstallments: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: 12,
    color: '#333333',
    letterSpacing: 0.05,
  },
  divider: {
    backgroundColor: '#8A8C8E',
    width: 1,
    height: 16,
    marginHorizontal: configDeviceSizes.DEVICE_WIDTH > 320 ? 6 : 4,
  },
});
