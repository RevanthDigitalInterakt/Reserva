import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../base/styles';

export const customInputTypeStyles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  buttonActionSubmit: {
    backgroundColor: COLORS.TEXT_INPUT_CONTAINER,
    paddingBottom: 18,
    paddingTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    top: 0,
    right: 0,
    width: '20%',
    height: '100%',
    position: 'absolute',
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
