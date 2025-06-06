import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MODAL_BACKGROUND_COLOR,
  },

  modalContent: {
    alignSelf: 'stretch',
    marginHorizontal: 40,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 20,
  },

  modalView: {
    marginVertical: 20,
  },

  modalActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 15,
    backgroundColor: COLORS.TEXT_INPUT_CONTAINER,
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: 20,
  },

  modalButtonCancel: {
    backgroundColor: COLORS.TEXT_INPUT_CONTAINER,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },

  modalButtonClose: {
    backgroundColor: COLORS.WHITE,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.TEXT_INPUT_CONTAINER,
    width: '45%',
  },

  modalTextButtonCancel: {
    color: COLORS.WHITE,
    fontFamily: 'ReservaSans-Regular',
    fontSize: 14,
    textTransform: 'uppercase',
  },

  modalTextButtonClose: {
    color: COLORS.TEXT_INPUT_CONTAINER,
    fontFamily: 'ReservaSans-Regular',
    fontSize: 14,
    textTransform: 'uppercase',
  },

  modalTitle: {
    fontFamily: 'ReservaSerif-Regular',
    fontSize: 20,
    color: COLORS.BLACK,
    marginBottom: 10,
  },

  modalSubtitle: {
    fontFamily: 'ReservaSans-Regular',
    fontSize: 14,
    color: COLORS.BLACK,
  },
});
