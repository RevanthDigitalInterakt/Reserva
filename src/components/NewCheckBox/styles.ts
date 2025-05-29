import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { COLORS, FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: scale(16),
    height: scale(16),
  },
  label: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontSize: scale(12),
    marginLeft: 4,
  },
});

export default styles;
