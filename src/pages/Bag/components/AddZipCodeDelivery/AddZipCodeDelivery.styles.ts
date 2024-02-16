import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const addZipCodeDeliveryStyles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    paddingVertical: 12,
    borderColor: COLORS.BORDER_GRAY,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textTitle: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '500',
  },
  textDescription: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.TEXT_GRAY,
  },
  labelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconRight: {
    maxHeight: 16,
    maxWidth: 16,
  },
});
