import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles';

const { width } = Dimensions.get('window');
const size = width / 10;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.MEDIUM_BLACK,
    minWidth: size,
    height: size / 0.9,
    borderRadius: size / 8,
    margin: 0,
    padding: 0,
  },
});

export default styles;
