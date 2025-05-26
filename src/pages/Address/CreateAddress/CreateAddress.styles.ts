import { StyleSheet } from 'react-native';
import { COLORS } from '../../../base/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  content: {
    marginVertical: 10,
  },

  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  labelMainAddress: {
    color: COLORS.TEXT_INPUT,
    fontWeight: '700',
  },

  title: {
    fontFamily: 'ReservaSerif-Regular',
    fontSize: 24,
    color: COLORS.BLACK,
  },

  subtitle: {
    fontFamily: 'ReservaSans-Regular',
    fontSize: 14,
    color: COLORS.BLACK,
  },

  actionButtonSubmit: {
    backgroundColor: COLORS.TEXT_INPUT_CONTAINER,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textActionButtonSubmit: {
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'ReservaSans-Bold',
    fontSize: 14,
    lineHeight: 18,
  },

  actionButtonCancel: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.TEXT_INPUT_CONTAINER,
  },

  textActionButtonCancel: {
    color: COLORS.TEXT_INPUT_CONTAINER,
    textTransform: 'uppercase',
    fontFamily: 'ReservaSans-Bold',
    fontSize: 14,
    lineHeight: 18,
  },

  scrollViewContent: {
    padding: 20,
    marginBottom: 60,
  },
});

export default styles;
