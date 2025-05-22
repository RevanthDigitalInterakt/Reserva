import { StyleSheet } from 'react-native';
import { FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 24,
    gap: 12,
    marginLeft: 16,
  },
  title: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 18,
    fontWeight: '700',
  },
});
