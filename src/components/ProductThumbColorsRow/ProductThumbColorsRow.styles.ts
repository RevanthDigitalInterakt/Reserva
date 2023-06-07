import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: 25,
    paddingTop: 10,
    marginBottom: -5,
    flexDirection: 'row',
  },

  circleContainer: {
    width: 15,
    height: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  circle: {
    width: 12,
    height: 12,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },

  text: {
    color: '#8A8C8E',
    fontSize: 11,
    fontWeight: '400',
  },
});
