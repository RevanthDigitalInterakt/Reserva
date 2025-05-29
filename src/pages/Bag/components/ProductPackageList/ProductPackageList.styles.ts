import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles';

export const productPackageListStyles = StyleSheet.create({
  titleContainer: {
    marginTop: 12,
  },
  title: {
    color: COLORS.LIGHT_BLACK,
    fontSize: 18,
    fontFamily: 'Reserva Sans',
    fontWeight: '500',
  },
  titleUnavailable: {
    color: COLORS.INPUT_ERROR_MESSAGE,
  },
  divider: {
    height: 1,
    marginTop: 24,
    backgroundColor: COLORS.CEMENT_GRAY,
  },
});
