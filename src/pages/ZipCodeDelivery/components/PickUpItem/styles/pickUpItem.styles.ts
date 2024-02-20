import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../base/styles';

export const pickUpItemStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 16,
    borderColor: COLORS.BORDER_GRAY,
    marginBottom: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textWrapper: {
    maxWidth: '90%',
  },
  friendlyNameText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.TEXT_INPUT_CONTAINER,
  },
  addressText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
  },
});
