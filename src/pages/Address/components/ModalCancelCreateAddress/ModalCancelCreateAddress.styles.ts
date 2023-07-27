import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  modalContent: {
    alignSelf: 'stretch',
    marginHorizontal: 40,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  modalView: {
    marginVertical: 20,
  },

  modalActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 15,
    backgroundColor: '#333333',
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: 20,
  },

  modalButtonCancel: {
    backgroundColor: '#333333',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },

  modalButtonClose: {
    backgroundColor: '#ffffff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333333',
    width: '45%',
  },

  modalTextButtonCancel: {
    color: '#ffffff',
  },
});
