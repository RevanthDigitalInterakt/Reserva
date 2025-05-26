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
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    top: 430,
    padding: 20,
    alignItems: 'center',
  },

  modalHeader: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },

  modalTitle: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 17,
  },

  modalParagraph: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },

  modalPickerContainer: {
    alignSelf: 'stretch',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    padding: 15,
  },

  modalPickerContent: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: 20,
    color: COLORS.LIGHT_GRAY,
  },

  modalActionButton: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginVertical: 10,
    borderRadius: 50,
    padding: 20,
  },

  modalActionButtonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
  },
});
