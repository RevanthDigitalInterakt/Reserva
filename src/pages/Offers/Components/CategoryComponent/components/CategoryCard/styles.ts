import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../base/styles';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';

export const styles = StyleSheet.create({
  childContainer: {
    backgroundColor: COLORS.WHITE,
    width: configDeviceSizes.DEVICE_WIDTH * 0.20,
    height: configDeviceSizes.DEVICE_WIDTH * 0.20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.WHITE_2,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 13,
    elevation: 5,
  },
});
