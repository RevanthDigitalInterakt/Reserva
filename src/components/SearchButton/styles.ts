import { Platform, StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { platformType } from '../../utils/platformType';

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    shadowColor: '#0000001A',
    shadowOffset: {
      width: 0,
      height: Platform.OS === platformType.ANDROID ? -4 : 4,
    },
    shadowOpacity: Platform.OS === platformType.ANDROID ? 0.2 : 1,
    shadowRadius: 10,
  },
  contentWrapper: {
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 16,
    width: '90%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    padding: 15,
  },
  button: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'ReservaSans-Regular',
    color: '#A6A6A6',
    fontSize: scale(14),
    letterSpacing: -0.4,
    flex: 1,
  },
});

export default styles;
