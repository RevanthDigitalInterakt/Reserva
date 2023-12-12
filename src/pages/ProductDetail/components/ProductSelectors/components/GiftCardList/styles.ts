import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    fontSize: 24,
    marginBottom: 32,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  cardOption: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.CEMENT_GRAY,
    paddingBottom: 16,
    marginBottom: 16,
  },
  cardOptionText: {
    color: COLORS.TEXT_INPUT,
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default styles;
