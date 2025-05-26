import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    height: '100%',

  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  dismissOverlay: {
    position: 'absolute',
    backgroundColor: COLORS.BLACK,
    opacity: 0.55,
    width: '100%',
    height: '100%',
  },
});
