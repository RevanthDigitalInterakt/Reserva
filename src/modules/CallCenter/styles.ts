import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles';

const styles = StyleSheet.create({
  primeButton: {
    backgroundColor: COLORS.PRIME_GOLD_BUTTON,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.DIVIDER,
  },
  text: {
    marginHorizontal: 10,
  },
});

export default styles;
