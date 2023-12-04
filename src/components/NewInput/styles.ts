import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.TEXT_INPUT,
    paddingRight: scale(18),
    paddingLeft: scale(11),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: scale(14),
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    color: COLORS.TEXT_INPUT,
  },
  textInputPlaceholder: {
    width: '100%',
    height: '100%',
    fontSize: scale(14),
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
  },
  arrowIcon: {
    width: scale(8),
    height: scale(14),
  },
});

export default styles;
