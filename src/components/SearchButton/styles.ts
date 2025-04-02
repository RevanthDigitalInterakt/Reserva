import { Platform, StyleSheet } from 'react-native';
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
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    padding: 12,
    height: 42,
  },
  button: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'ReservaSans-Regular',
    fontWeight: 'normal',
    color: '#A2A2A2',
    fontSize: 14,
    letterSpacing: -0.14,
    flex: 1,
    lineHeight: 14,
  },
});

export default styles;
