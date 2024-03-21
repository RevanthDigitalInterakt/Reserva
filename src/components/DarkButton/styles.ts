import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 4,
    paddingHorizontal: 48,
    paddingVertical: 16,
    width: 177,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
    fontSize: 14,
    fontWeight: '600',
  },
});
