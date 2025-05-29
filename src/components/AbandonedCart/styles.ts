import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginTop: scale(25),
    margin: scale(12),
  },
});
