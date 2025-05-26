import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { COLORS } from '../../../../base/styles/colors';

const commonWrapperStyle = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const styles = StyleSheet.create({
  wrapperTop: {
    ...commonWrapperStyle.wrapper,
    paddingTop: 32,
  },

  title: {
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 24,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.GRAY,
    marginBottom: 20,
    textAlign: 'center',
  },

  subtitleBold: {
    fontSize: 16,
    color: '#000000',
  },

  image: {
    ...commonWrapperStyle.wrapper,
    width: configDeviceSizes.DEVICE_WIDTH,
    paddingTop: 400,
    marginTop: -18,
  },

  legalText: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    color: COLORS.GRAY,
    marginBottom: 24,
    top: 18,
  },

  button: {
    marginTop: 24,
    width: configDeviceSizes.DEVICE_WIDTH / 1.4,
    backgroundColor: '#000000',
    height: configDeviceSizes.DEVICE_HEIGHT / 13,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    textTransform: 'uppercase',
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
});
