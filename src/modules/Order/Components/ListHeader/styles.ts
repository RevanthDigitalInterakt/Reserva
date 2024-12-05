import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 32,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: 48,
  },
  textTitle: {
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(20),
  },

  lastOrderContainer: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE,
    width: '100%',
  },
});

export default styles;
