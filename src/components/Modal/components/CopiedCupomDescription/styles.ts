import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  normalDescription: {
    color: COLORS.TEXT_INPUT_CONTAINER,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 16,
  },
  boldDescription: {
    color: COLORS.TEXT_INPUT_CONTAINER,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontSize: 16,
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
  disclaimer: {
    color: COLORS.TEXT_INPUT_CONTAINER,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
});

export default styles;
