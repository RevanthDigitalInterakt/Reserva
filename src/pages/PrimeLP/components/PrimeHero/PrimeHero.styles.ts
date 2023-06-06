import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingTop: 65,
    paddingBottom: 110,
    paddingHorizontal: 20,
  },

  icon: {
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    lineHeight: 23,
    textAlign: 'center',
    color: COLORS.WHITE,
    marginBottom: 24,
  },

  bold: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },

  subtitle: {
    marginBottom: 32,
    fontSize: 12.5,
    lineHeight: 18.5,
    textAlign: 'center',
    color: COLORS.WHITE,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },

  button: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  buttonText: {
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.5,
    fontWeight: '700',
  },
});
