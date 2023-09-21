import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';
import { FONTS } from '../../../../base/styles';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.MODAL_BACKGROUND_COLOR,
    justifyContent: 'flex-end',
  },

  modalContent: {
    height: '65%',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
  },

  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 24,
  },

  modalRow: {
    flexDirection: 'row',
  },

  modalSubTitle: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
  },

  modalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DIVIDER,
    marginVertical: 20,
  },

  modalItemContainer: {
    borderWidth: 1,
    borderColor: COLORS.DIVIDER,
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  modalItemMedia: {
    width: 40,
    height: 40,
  },

  modalItemTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    textTransform: 'uppercase',
    margin: 10,
    padding: 10,
  },

  modalFooter: {
    padding: 10,
  },

  modalFooterTextInfo: {
    color: COLORS.INPUT_ERROR_MESSAGE,
    marginTop: -2,
    marginLeft: 5,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontSize: 14,
  },

  modalFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  modalFooterTitle: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
  },

  modalFooterLabel: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontSize: 16,
  },

  modalFooterLabelAlignment: {
    alignItems: 'flex-end',
  },
});

export default styles;
