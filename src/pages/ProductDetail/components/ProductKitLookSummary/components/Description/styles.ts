import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 12,
    marginTop: 32,
    marginBottom: 24,
  },

  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },

  textAbout: {
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 25.2,
  },

  textDescription: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.8,
    paddingHorizontal: 24,
    marginVertical: 24,
  },

  divider: {
    backgroundColor: COLORS.CEMENT_GRAY,
    width: '98%',
    height: 1,
    marginHorizontal: configDeviceSizes.DEVICE_WIDTH > 320 ? 6 : 4,
  },
});

export default styles;
