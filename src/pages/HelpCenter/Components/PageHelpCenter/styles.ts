import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    paddingTop: scale(28),
    paddingHorizontal: scale(15),
  },
  containerTitle: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  containerTxtTitle: {
    marginBottom: 8,
  },
  txtTitle: {
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(20),
  },
  containerBody: {
    alignSelf: 'flex-start',
    marginTop: scale(16),
    marginBottom: scale(20),
  },
});

export default styles;
