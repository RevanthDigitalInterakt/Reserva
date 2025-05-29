import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { COLORS } from '../../base/styles';
import { platformType } from '../../utils/platformType';

const styles = StyleSheet.create({
  topBarDefault: {
    zIndex: 999,
    position: 'absolute',
  },
  transparentTopBar: {
    zIndex: 999,
  },
  whiteTopBar: {
    zIndex: 999,
    position: 'absolute',
  },
  rouletWrapper: {
    width: '100%',
    height: configDeviceSizes.DEVICE_HEIGHT,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -20,
    zIndex: 999,
  },
  webView: {
    width: '100%',
    height: configDeviceSizes.DEVICE_HEIGHT * 0.80,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    zIndex: 999,
  },
  loaderWrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: configDeviceSizes.DEVICE_WIDTH / 2 - 25,
    top: (configDeviceSizes.DEVICE_HEIGHT * 0.9) / 2 - 25,
    alignItems: 'center',
    justifyContent: 'center',

  },
  closeButton: {
    position: 'absolute',
    left: '10%',
    top: platformType.IOS ? '10%' : 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.RED,
  },
  closeButtonText: {
    fontSize: 12,
    color: COLORS.WHITE,
  },
});

export default styles;
