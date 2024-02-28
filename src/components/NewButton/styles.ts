import { StyleSheet } from 'react-native';
import type { NewButtonStyleProps } from './types';
import { COLORS, FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

const styles = ({ disabled, textColor }: NewButtonStyleProps) => StyleSheet.create({
  container: {
    backgroundColor: disabled ? COLORS.DISABLED_GRAY : COLORS.ENABLED_GREEN,
    height: scale(51),
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
