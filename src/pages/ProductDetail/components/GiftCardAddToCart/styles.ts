import { Platform, StyleSheet } from 'react-native';
import { platformType } from '../../../../utils/platformType';

const styles = StyleSheet.create({
  container: {
    shadowColor: '#0000001A',
    shadowOffset: {
      width: 0,
      height: Platform.OS === platformType.ANDROID ? -4 : 4,
    },
    shadowOpacity: Platform.OS === platformType.ANDROID ? 0.2 : 1,
    shadowRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    height: '18%',
    paddingHorizontal: 12,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  loader: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: '70%',
    left: '50%',
  },

});

export default styles;
