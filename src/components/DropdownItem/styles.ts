import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';

export const styles = StyleSheet.create({
  textGray: {
    color: COLORS.GRAY,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 13,
    marginBottom: 24,
    overflow: 'hidden',
  },
});
