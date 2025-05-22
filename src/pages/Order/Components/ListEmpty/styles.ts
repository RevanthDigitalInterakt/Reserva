import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: '60%',
  },

  containerTitle: {
    marginHorizontal: '5%',
  },

  textTitle: {
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(19),
  },

  containerSubTitle: {
    marginHorizontal: 58,
    marginVertical: 28,
  },

  subTitle: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: scale(11),
    textAlign: 'center',
  },

  button: {
    width: 258,
    minWidth: 130,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: COLORS.LIGHT_BLACK,
    alignItems: 'center',
  },

  btnTitle: {
    fontSize: scale(10),
    fontFamily: FONTS.NUNITO_BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 20,
    letterSpacing: 2,
  },
});

export default styles;
