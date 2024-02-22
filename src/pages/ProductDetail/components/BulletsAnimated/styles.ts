import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

const styles = StyleSheet.create({
  boxAnimatedBullets: {
    height: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },

  slidingIndicatorStyle: {
    backgroundColor: COLORS.TEXT_INPUT_CONTAINER,
    width: 8,
    height: 8,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 8,
  },

  bulletsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 19,
  },

  bullet: {
    borderWidth: 1,
    width: 8,
    height: 8,
    borderRadius: 8,
    borderColor: COLORS.TEXT_INPUT_CONTAINER,
  },
});

export default styles;
