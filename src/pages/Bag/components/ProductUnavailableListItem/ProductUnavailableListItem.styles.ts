import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  primeTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.RED,
    alignItems: 'center',
    paddingTop: 1.5,
    paddingBottom: 2.5,
  },
  descriptionWrapper: {
    backgroundColor: COLORS.PINK_LIGHT,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.PINK,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,

  },
  description: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    color: COLORS.INPUT_TEXT,
    lineHeight: 18,
  },
  titleSection: {
    marginLeft: 8,
  },
});
