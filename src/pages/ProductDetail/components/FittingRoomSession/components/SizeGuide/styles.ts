import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';
import { scale } from '../../../../../../utils/scale';

const styles = StyleSheet.create({
  containerBtnSizeGuide: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    width: configDeviceSizes.DEVICE_WIDTH * 0.45,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  containerBtnSizeGuideFull: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    width: configDeviceSizes.DEVICE_WIDTH * 0.92,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 24,
  },

  txtSizeGuide: {
    fontSize: scale(11),
    fontFamily: FONTS.NUNITO_REGULAR,
    textTransform: 'uppercase',
  },
});

export default styles;
