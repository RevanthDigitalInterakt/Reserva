import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../base/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  shelfName: {
    fontFamily: FONTS.RESERVA_DISPLAY_REGULAR,
    fontSize: 24,
  },
  shelfContainer: {
    marginTop: 10,
  },
  shelf: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
