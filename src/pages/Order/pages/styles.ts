import { StyleSheet } from 'react-native';
import { COLORS } from '../../../base/styles';

const styles = StyleSheet.create({
  orderListSafeArea: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  orderListItem: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
});

export default styles;
