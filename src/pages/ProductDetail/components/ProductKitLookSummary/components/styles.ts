import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../../base/styles';

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
    margin: 2,
    width: 24,
    height: 24,
  },

  containerImage: {
    width: 100,
    height: 154,
  },

  containerColors: {
    marginTop: 8,
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
    marginBottom: 8,
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

  containerColor: {
    flexDirection: 'column',
  },

  containerSize: {
    marginTop: 8,
  },
});

export default styles;
