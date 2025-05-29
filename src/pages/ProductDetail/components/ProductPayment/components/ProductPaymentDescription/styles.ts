import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';

export default StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 14,
    color: COLORS.BLACK,
  },
  descriptionWrapper: {
    marginTop: 8,
  },
  description: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: 12,
  },
});
