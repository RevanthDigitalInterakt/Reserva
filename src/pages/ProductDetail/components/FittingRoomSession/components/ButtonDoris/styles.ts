import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';
import { COLORS, FONTS } from '../../../../../../base/styles';
import { scale } from '../../../../../../utils/scale';

const styles = StyleSheet.create({
  containerDoris: {
    marginTop: 24,
  },

  containerBtnDoris: {
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

  containerBtnDorisFull: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 8,
    width: configDeviceSizes.DEVICE_WIDTH * 0.92,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  containerNew: {
    width: 47,
    height: 19,
    backgroundColor: COLORS.INPUT_ERROR_MESSAGE,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    position: 'absolute',
    left: '-2.5%',
    top: '-20%',
  },

  txtNew: {
    fontSize: 10,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    color: COLORS.WHITE,
  },

  txtDoris: {
    fontSize: scale(11),
    fontFamily: FONTS.NUNITO_REGULAR,
    textTransform: 'uppercase',
  },
});

export default styles;
