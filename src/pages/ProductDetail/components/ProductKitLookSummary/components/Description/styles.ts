import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../../../base/styles';

const styles = StyleSheet.create({
  mainContainer: {
    margin: 12,
  },

  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
});

export default styles;
