import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 32,
    paddingHorizontal: 30,
    minHeight: '100%',
    overflow: 'hidden',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: COLORS.GRAY,
    marginVertical: 24,
  },
  sectionTitle: {
    marginBottom: 32,
    fontSize: 20,
  },
});
