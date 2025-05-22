import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';

export const counterStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
    gap: 12,
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.LIGHT_GRAY,
    flexDirection: 'row',
  },
  buttonText: {
    color: COLORS.BLACK,
    fontSize: 16,
  },
  quantityText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '700',
  },
});
