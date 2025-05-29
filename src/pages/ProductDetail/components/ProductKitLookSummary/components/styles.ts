import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../base/styles';
import configDeviceSizes from '../../../../../utils/configDeviceSizes';
import { scale } from '../../../../../utils/scale';

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 24,
    flexDirection: 'row',
    gap: 4,
    width: '92%',
  },

  containerIcon: {
    width: 24,
    height: 24,
  },

  containerImage: {
    width: 100,
    height: 154,
  },

  containerColors: {
    marginTop: 4,
  },

  containerTexts: {
    flexDirection: 'row',
    paddingBottom: 4,
  },

  title: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    lineHeight: 19.6,
    fontSize: 14,
    marginBottom: 4,
  },

  textBold: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '500',
    fontSize: 12,
    paddingRight: 4,
  },

  textColor: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '500',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'capitalize',
  },

  textSize: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '500',
    lineHeight: 14,
    fontSize: 12,
    textTransform: 'uppercase',
  },

  containerColor: {
    flexDirection: 'column',
    flex: 1,
  },

  containerInstallments: {
    flexDirection: 'row',
    alignContent: 'center',
  },

  textInstallments: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19.6,
  },

  divider: {
    backgroundColor: '#8A8C8E',
    width: 2,
    height: 16,
    marginHorizontal: configDeviceSizes.DEVICE_WIDTH > 320 ? 6 : 4,
  },

  textSizeSelected: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '500',
    lineHeight: 19.6,
    fontSize: scale(11),
    color: COLORS.ALERT,
  },

  containerSize: {
    marginTop: 4,
  },
});

export default styles;
