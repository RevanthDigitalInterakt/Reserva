import { StyleSheet } from 'react-native';
import { COLORS } from '../../../base/styles/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  title: {
    fontFamily: 'ReservaSerif-Regular',
    fontSize: 24,
    color: COLORS.BLACK,
  },

  listContainer: {
    padding: 20,
  },

  actionButton: {
    backgroundColor: COLORS.ACTION_BUTTON_COLOR,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionButtonText: {
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'ReservaSans-Bold',
    fontSize: 14,
    lineHeight: 18,
  },

  emptyListAddressText: {
    color: COLORS.ACTION_BUTTON_COLOR,
    textTransform: 'uppercase',
    fontFamily: 'ReservaSans-Bold',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default style;
