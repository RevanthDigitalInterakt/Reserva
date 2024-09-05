import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../base/styles/fonts';
import { COLORS } from '../../../../base/styles';

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
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionTitleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionTitleText: {
    color: COLORS.SHELF_DARK_GRAY,
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
    fontSize: 12,
  },
});
