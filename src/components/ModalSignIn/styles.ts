import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';

export const objectStyles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    width: configDeviceSizes.DEVICE_WIDTH - 48,
    top: -60,
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
});
