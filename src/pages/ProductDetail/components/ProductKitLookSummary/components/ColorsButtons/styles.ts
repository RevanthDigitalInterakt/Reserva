import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../base/styles';

const styles = (selectedColor: boolean) => StyleSheet.create({
  mainContainer: {
    width: 198,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  boxContainer: {
    height: 31,
    width: 31,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: selectedColor ? COLORS.BLACK : COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },

  containerImage: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBackground: {
    width: 25,
    height: 25,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
  },
});

export default styles;
