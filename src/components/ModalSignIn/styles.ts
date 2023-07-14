import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { COLORS } from '../../base/styles/colors';

export const objectStyles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    width: configDeviceSizes.DEVICE_WIDTH - 48,
  },
  wrapperAboutPrime: {
    marginTop: 8,
    marginBottom: 24,
  },
  footerDescription: {
    marginTop: 12,
  },
  footerHighlight: {
    textDecorationLine: 'underline',
  },
  headerDescription: {
    marginTop: 24,
    marginBottom: 24,
  },
  modalText: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 16,
    lineHeight: 16.8,
    letterSpacing: 0.5,
    color: COLORS.DARK_GRAY,
  },
  highlightedText: {
    color: COLORS.BLACK,
    top: 3.5,
  },
});
