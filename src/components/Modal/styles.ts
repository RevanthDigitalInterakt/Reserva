import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    color: COLORS.TEXT_INPUT_CONTAINER,
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    fontSize: 26,
  },

});

export default styles;
