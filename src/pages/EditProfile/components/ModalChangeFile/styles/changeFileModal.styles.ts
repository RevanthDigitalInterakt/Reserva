import { StyleSheet } from 'react-native';

const ChangeFileModalStyles = StyleSheet.create({
  modalProfile: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    width: '100%',
    bottom: 0,
  },
  boxTouchable: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export { ChangeFileModalStyles };
