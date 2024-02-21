import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export default StyleSheet.create({
  title: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 20,
    color: COLORS.BLACK,
  },
  disclaimer: {
    fontFamily: FONTS.WORK_SANS_REGULAR,
    fontSize: 12,
    color: COLORS.INPUT_ERROR_MESSAGE,
  },
  labelText: {
    fontFamily: FONTS.WORK_SANS_REGULAR,
    fontSize: 14,
    marginBottom: 12,
    marginTop: 16,
  },
  sizesWrapper: {
    marginBottom: 14,
  },
  umP5PWrapper: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    height: 28,
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 18,
  },
  umP5PText: {
    fontSize: 10,
    width: '100%',
    flex: 1,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
  },
});
