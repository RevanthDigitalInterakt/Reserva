import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../base/styles';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';
import { platformType } from '../../../../../../utils/platformType';

export const styles = StyleSheet.create({
  childContainer: {
    backgroundColor: COLORS.WHITE,
    width: configDeviceSizes.DEVICE_WIDTH * 0.20,
    height: configDeviceSizes.DEVICE_WIDTH * 0.20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.WHITE_2,
    shadowColor: Platform.OS === platformType.ANDROID ? COLORS.SHELF_GRAY : COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.09,
    shadowRadius: 7,
    elevation: Platform.OS === platformType.ANDROID ? 16 : 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
