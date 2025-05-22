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
    marginTop: 20,
    backgroundColor: '#333333',
  },
});
