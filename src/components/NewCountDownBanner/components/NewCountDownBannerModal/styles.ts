import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import { COLORS, FONTS } from '../../../../base/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    minHeight: scale(250),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(34),
    paddingVertical: scale(24),
    borderRadius: 10,
  },
  title: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: scale(20),
    color: COLORS.LIGHT_BLACK,
    textAlign: 'left',
    width: '100%',
  },
  rules: {
    lineHeight: scale(18),
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: scale(24),
    width: '100%',
  },
  button: {
    marginTop: scale(24),
    marginBottom: scale(5),
    height: scale(40),
    width: '100%',
    backgroundColor: COLORS.MEDIUM_GRAY,
    borderColor: COLORS.MEDIUM_GRAY,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontSize: scale(12),
  },
});

export default styles;
