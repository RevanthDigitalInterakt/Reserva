import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../base/styles/fonts';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  shelfTitle: {
    fontFamily: FONTS.RESERVA_DISPLAY_REGULAR,
    fontSize: 24,
    marginLeft: 20,
  },
  shelfContainer: {
    marginTop: 0,
  },
  shelf: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
