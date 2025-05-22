import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flatListContainer: {
    paddingLeft: 4,
    paddingRight: 4,
  },

  slidingIndicatorStyle: {
    backgroundColor: '#6F6F6F',
    width: 7,
    height: 7,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 7,
  },

  bulletsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 19,
  },

  bullet: {
    borderWidth: 1,
    width: 7,
    height: 7,
    borderRadius: 7,
    borderColor: '#6F6F6F',
  },
});
