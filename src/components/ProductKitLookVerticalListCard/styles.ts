import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { scale } from '../../utils/scale';
import { COLORS, FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 12,
    marginBottom: 24,
  },
  childContainer: {
    marginTop: 8,
    width: configDeviceSizes.DEVICE_WIDTH * 0.45,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: '86%',
  },
  textTitle: {
    fontSize: scale(12),
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '700',
    lineHeight: 18.48,
    color: COLORS.GRAY,
  },
});

export default styles;
