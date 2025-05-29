import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../base/styles';
import { scale } from '../../../../../../utils/scale';

export const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    gap: scale(12),
    flexWrap: 'wrap',
    marginTop: scale(10),
  },
});
