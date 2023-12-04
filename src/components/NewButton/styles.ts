import { StyleSheet } from 'react-native';
import type { NewButtonStyleProps } from './types';
import { COLORS, FONTS } from '../../base/styles';

const styles = ({ disabled, textColor }: NewButtonStyleProps) => StyleSheet.create({
  container: {
    backgroundColor: disabled ? COLORS.DISABLED_GRAY : COLORS.ENABLED_GREEN,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: textColor || COLORS.WHITE,
    fontSize: 14,
    lineHeight: 18.48,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
  },
});

export default styles;
