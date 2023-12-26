import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    borderRadius: 4,
    paddingHorizontal: 48,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
    fontSize: 14,
    fontWeight: '600',
  },
});
