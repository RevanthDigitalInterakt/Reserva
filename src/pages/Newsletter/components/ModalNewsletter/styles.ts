import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
  },

  textContainer: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 13,
  },

  text: {
    color: COLORS.INPUT_TEXT,
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(16),
    lineHeight: 22.4,
    letterSpacing: -1,
    textAlign: 'center',
  },

  textError: {
    color: COLORS.INPUT_ERROR_MESSAGE,
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(16),
    lineHeight: 22.4,
    letterSpacing: -1,
    textAlign: 'center',
  },

  btnGoHome: {
    backgroundColor: COLORS.BLACK,
    height: 55,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  txtBtnGoHome: {
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '400',
    fontSize: scale(13),
    lineHeight: 17.92,
    letterSpacing: -1,
  },
});
