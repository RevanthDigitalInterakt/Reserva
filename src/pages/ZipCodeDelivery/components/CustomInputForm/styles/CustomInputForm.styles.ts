import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../base/styles';

export const customInputTypeStyles = StyleSheet.create({
  buttonActionSubmit: {
    backgroundColor: COLORS.TEXT_INPUT_CONTAINER,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    right: 4,
    borderWidth: 1,
    paddingHorizontal: 34,
    paddingVertical: 15,
  },
  textActionButtonSubmit: {
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'ReservaSans-Bold',
    fontSize: 14,
    lineHeight: 18,
  },
  errorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorIcon: {
    width: 13,
    height: 13,
  },
  errorMessage: {
    color: COLORS.INPUT_ERROR_MESSAGE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
