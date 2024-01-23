import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';

const styles = StyleSheet.create({
  textFinalValue: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.8,
  },
  textLabelInstallments: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.8,
  },

  textInstallments: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16.8,
  },
});

export default styles;
