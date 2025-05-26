import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    top: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderColor: COLORS.LOADING_BORDER,
    borderRadius: 75,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'center',
  },

});
