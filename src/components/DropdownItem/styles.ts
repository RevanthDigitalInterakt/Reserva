import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';

export const styles = StyleSheet.create({
  body: {
    color: COLORS.GRAY,
    lineHeight: 20,
    fontSize: 16,
    fontFamily: 'ReservaSans-Regular',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  contentContainer: {
    marginBottom: 32,
    overflow: 'hidden',
  },
});
