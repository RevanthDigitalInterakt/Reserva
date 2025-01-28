import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  modalContent: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 17,
  },

  modalTitleBold: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 18,
  },

  modalParagraph: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: 17,
  },

  modalActionButton: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
    borderRadius: 50,
    padding: 20,
  },

  modalActionButtonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
  },
});
