import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../base/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  shelfTitle: {
    fontFamily: FONTS.RESERVA_DISPLAY_REGULAR,
    fontSize: 24,
    letterSpacing: 0,
  },
  shelfContainer: {
    marginTop: 10,
  },
  shelf: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
