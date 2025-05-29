import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { COLORS } from '../../base/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dividerWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: scale(2),
    height: scale(11),
  },

  divider: {
    height: scale(3),
    width: scale(3),
    borderRadius: scale(8),
    backgroundColor: COLORS.MEDIUM_BLACK,
  },
});

export default styles;
