import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

const style = StyleSheet.create({
  text: {
    color: COLORS.DARKISH_GREY,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },

  emptyBar: {
    backgroundColor: COLORS.DARK_GREY_BLUE,
  },

  greenBar: {
    backgroundColor: COLORS.SUCCESS_GREEN,
  },
});

export default style;
