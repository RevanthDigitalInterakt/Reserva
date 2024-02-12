import { StyleSheet } from 'react-native';

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
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
});
