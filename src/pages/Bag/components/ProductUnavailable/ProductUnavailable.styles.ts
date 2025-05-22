import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const productUnavailableStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  cardContainer: {
    backgroundColor: COLORS.PINK_SECONDARY,
    padding: 14,
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 33,
    borderRadius: 4,
    flexDirection: 'row',
    alignContent: 'flex-start',
    gap: 8,
  },
  textWrap: {
    marginTop: 12,
    maxWidth: '85%',
  },
  iconContainer: {
    marginTop: 8,
  },
  title: {
    color: COLORS.TEXT_CARD,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '700',

  },
  description: {
    marginTop: 10,
    color: COLORS.TEXT_CARD,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '400',
  },
});
